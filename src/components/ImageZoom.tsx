"use client";
import { useCallback, useRef, useState } from "react";

interface ImageZoomProps {
     src: string;
     alt: string;
     width?: number | string;
     height?: number | string;
     zoomScale?: number;
     zoomSize?: number;
     transitionDuration?: number;
     className?: string;
     zoomClassName?: string;
}

export default function ImageZoom({
     src,
     alt,
     width = "100%",
     height = "100%",
     zoomScale = 2,
     zoomSize = 100,

     className = "",
     zoomClassName = "",
}: ImageZoomProps) {
     const [isHovered, setIsHovered] = useState(false);
     const [position, setPosition] = useState({ x: 0, y: 0 });
     const containerRef = useRef<HTMLDivElement>(null);

     const handleMouseMove = useCallback(
          (e: React.MouseEvent<HTMLDivElement>) => {
               if (!containerRef.current) return;

               const container = containerRef.current;
               const { left, top, width, height } =
                    container.getBoundingClientRect();
               const x = ((e.clientX - left) / width) * 100;
               const y = ((e.clientY - top) / height) * 100;
               setPosition({ x, y });
          },
          []
     );

     return (
          <div className="relative border border-red-500">
               <div
                    ref={containerRef}
                    className={`relative ${className} rounded-lg overflow-hidden border`}
                    style={{ width, height }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={handleMouseMove}
               >
                    {/* Main Image */}
                    <img
                         src={src}
                         alt={alt}
                         className="w-full h-full object-cover"
                    />

                    {/* Zoomed Preview (absolute positioned) */}
                    {isHovered && (
                         <div
                              className={`absolute top-0 right-1 border-2 border-white rounded-lg shadow-lg overflow-hidden pointer-events-none ${zoomClassName}`}
                              style={{
                                   width: `${zoomSize}px`,
                                   height: `${zoomSize}px`,
                                   left: `calc(${position.x}% - ${
                                        zoomSize / 2
                                   }px)`,
                                   top: `calc(${position.y}% - ${
                                        zoomSize / 2
                                   }px)`,
                                   zIndex: 10,
                              }}
                         ></div>
                    )}
               </div>
               {isHovered && (
                    <div
                         className={`absolute top-0 border-2 border-white rounded-lg shadow-lg overflow-hidden pointer-events-none ${zoomClassName} `}
                         style={{
                              width,
                              height,
                              left: `calc(${
                                   typeof width === "number"
                                        ? `${width}px`
                                        : width
                              } + 10px)`,
                         }}
                    >
                         <img
                              src={src}
                              alt={`Zoomed ${alt}`}
                              className="w-full h-full object-cover"
                              style={{
                                   transform: `scale(${zoomScale})`,
                                   transformOrigin: `${position.x}% ${position.y}%`,
                                   objectPosition: `${position.x}% ${position.y}%`,
                              }}
                         />
                    </div>
               )}
          </div>
     );
}
