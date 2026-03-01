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

      {/* Navigation & Media Container */}
      <div
        className="flex items-center justify-center gap-4 md:gap-8 max-w-[95vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left chevron */}
        {media.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="flex-shrink-0 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        {/* Media content */}
        <div className="flex items-center justify-center">
          {isVideo ? (
            <video
              key={currentIndex}
              controls
              autoPlay
              className="w-[65vw] md:w-[55vw] xl:w-[45vw] h-[85vh] rounded-lg shadow-2xl object-contain bg-black/50"
            >
              <source src={currentItem.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-[65vw] md:w-[55vw] xl:w-[45vw] h-[85vh] relative flex items-center justify-center bg-black/50 rounded-lg shadow-2xl">
              <Image
                key={currentIndex}
                src={currentItem}
                alt=""
                fill
                className="object-contain p-2"
              />
            </div>
          )}
        </div>

        {/* Right chevron */}
        {media.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="flex-shrink-0 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(overlayContent, document.body);
};

export default MediaOverlay;
