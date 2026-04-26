import { useState, useEffect } from "react";
import { useParams } from "react-router";
import pinkHeart from "../assets/pinkHeart.png";
import api from "../lib/axios";

const Nameplate = ({ ping }) => {
  const [count, setCount] = useState(ping.value);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (id) => {
    if (saving) return;
    setCount((prev) => prev + 1);
    setSaving(true);
    try {
      await api.put(`/ping/${id}`);
    } catch (error) {
      console.error(error);
      setCount((prev) => prev - 1);
    } finally {
      setSaving(false);
    }
  };
  const handleReset = async (id) => {
    const previous = count;
    setCount(0);
    setSaving(true);
    try {
      await api.delete(`/ping/${id}`);
    } catch (error) {
      console.error(error);
      setCount(previous);
    } finally {
      setSaving(false);
    }
  };
  // const handleReset = (e, ping.id) => {
  //   e.preventDefault();
  //   try{
  //     api.delete(`/ping/${id}`)
  //   }catch(error){

  //   }
  // }
  return (
    <>
      <button
        className="border-2 w-3xs h-13 rounded-xl flex items-center hover:border-pink-800 transition ease-in-out z-10 justify-between p-1 cursor-pointer"
        onClick={() => handleUpdate(ping._id)}
      >
        <div className="flex justify-center items-center">
          <img src={pinkHeart} className="size-12 hover:size-13 transition" />
          <span className="absolute">{count}</span>
        </div>
        <div className="w-3xs text-center">{ping.person}</div>
        <button className="relative bg-green-400 text-[15px] rounded h-4 flex justify-center items-center text-center top-4 left-0.5 w-12 border-2"
        onClick={(e) => 
          {
            e.stopPropagation()
            handleReset(ping._id)}}>
          seen
        </button>
      </button>
    </>
  );
};

export default Nameplate;
