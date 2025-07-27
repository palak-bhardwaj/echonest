import React, { useState } from "react";
import { MdAdd, MdUpdate, MdClose } from "react-icons/md";
import DateSelector from "../../components/Input/DateSelector";
import ImageSelector from "../../components/Input/ImageSelector";
import TagInput from "../../components/Input/TagInput";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import uploadImage from "../../utils/uploadImage";

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || null
  );
  const [error, setError] = useState("");

  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";
      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/add-travel-story", {
        title,
        story,
        imageUrl,
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data?.story) {
        toast.success("Story Added Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const updateTravelStory = async () => {
    const storyId = storyInfo._id;
    try {
      let imageUrl = storyInfo.imageUrl || "";

      if (typeof storyImg === "object") {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.put(`/edit-story/${storyId}`, {
        title,
        story,
        imageUrl,
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data?.story) {
        toast.success("Story Updated Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title) return setError("Please enter the title");
    if (!story) return setError("Please enter the story");

    setError("");
    type === "edit" ? updateTravelStory() : addNewTravelStory();
  };

  const handleDeleteStoryImg = async () => {
    await axiosInstance.delete("/delete-image", {
      params: { imageUrl: storyInfo.imageUrl },
    });

    const postData = {
      title,
      story,
      visitedLocation,
      visitedDate: moment().valueOf(),
      imageUrl: "",
    };

    await axiosInstance.put(`/edit-story/${storyInfo._id}`, postData);
    setStoryImg(null);
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-xl font-semibold text-slate-800">
          {type === "add" ? "Add New Story" : "Update Story"}
        </h2>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition"
            onClick={handleAddOrUpdateClick}
          >
            {type === "add" ? (
              <>
                <MdAdd className="text-lg" /> Add Moment
              </>
            ) : (
              <>
                <MdUpdate className="text-lg" /> Update
              </>
            )}
          </button>

          <button
            className="p-2 hover:bg-slate-200 rounded-full transition"
            onClick={onClose}
          >
            <MdClose className="text-xl text-slate-500" />
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-right">{error}</p>}

      {/* Title Input */}
      <div>
        <label className="text-sm font-medium text-slate-700">Title</label>
        <input
          type="text"
          className="w-full text-lg mt-1 p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="A Day at the Great Wall"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Date Picker */}
      <div className="mt-2">
        <DateSelector date={visitedDate} setDate={setVisitedDate} />
      </div>

      {/* Image Selector */}
      <ImageSelector
        image={storyImg}
        setImage={setStoryImg}
        handleDeleteImg={handleDeleteStoryImg}
      />

      {/* Story Textarea */}
      <div>
        <label className="text-sm font-medium text-slate-700">Story</label>
        <textarea
          className="w-full mt-1 text-sm text-slate-800 bg-slate-50 p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="Your story and mood..."
          rows={8}
          value={story}
          onChange={({ target }) => setStory(target.value)}
        />
      </div>

      {/* Tag Input */}
      <div>
        <label className="text-sm font-medium text-slate-700">Location</label>
        <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
      </div>
    </div>
  );
};

export default AddEditTravelStory;
