"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

/**
 * Helper: determine if a media item is a video.
 * Media item can be a string (image path) or an object { video, thumbnail }.
 */
export const isVideoItem = (item) =>
  typeof item === "object" && item !== null && item.video;

/**
 * Helper: get the display src for a media item (image path or thumbnail).
 */
export const getDisplaySrc = (item) => {
  if (isVideoItem(item)) return item.thumbnail || item.video;
  return item;
};

/**
 * Helper: get the video src for a media item.
 */
export const getVideoSrc = (item) => {
  if (isVideoItem(item)) return item.video;
  return null;
};

/**
 * VideoThumbnail: renders a thumbnail image with a play button overlay.
 */
export const VideoThumbnail = ({ item, width, height, className, onClick }) => {
  const thumbnailSrc = getDisplaySrc(item);
  return (
    <div className={`relative cursor-pointer ${className || ""}`} onClick={onClick}>
      <Image
        src={thumbnailSrc}
        alt=""
        width={width}
        height={height}
        className="rounded-lg"
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg hover:bg-black/40 transition-colors duration-200">
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          <Play className="w-7 h-7 text-gray-800 ml-1" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

/**
 * MediaOverlay: full-screen modal for viewing media with chevron navigation.
 */
const MediaOverlay = ({ media, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent body scrolling when overlay is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
  }, [media.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
  }, [media.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goPrev, goNext]);

  if (!mounted) return null;

  const currentItem = media[currentIndex];
  const isVideo = isVideoItem(currentItem);

  const overlayContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        // Close when clicking the backdrop (not the content)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Counter */}
      {media.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
          {currentIndex + 1} / {media.length}
        </div>
      )}

      {/* Left chevron */}
      {media.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Right chevron */}
      {media.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Media content */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            key={currentIndex}
            controls
            autoPlay
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
          >
            <source src={currentItem.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            key={currentIndex}
            src={currentItem}
            alt=""
            width={900}
            height={600}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            style={{ width: "auto", height: "auto" }}
          />
        )}
      </div>
    </div>
  );

  return createPortal(overlayContent, document.body);
};

export default MediaOverlay;
