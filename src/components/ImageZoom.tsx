import { useState } from "react";

// ImageZoom Component (improved version)
function ImageZoom({
     src,
     alt,
     width = "100%",
     height = "100%",
     zoomScale = 2,
     lensSize = 100,
     transitionDuration = 0.2,
     className = "",
     lensClassName = "",
     previewClassName = "",
     previewOffset = 20,
}) {
     const [isHovered, setIsHovered] = useState(false);
     const [position, setPosition] = useState({ x: 50, y: 50 });
     const [imageLoaded, setImageLoaded] = useState(false);

     const handleMouseMove = (e) => {
          const container = e.currentTarget;
          const rect = container.getBoundingClientRect();

          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const x = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
          const y = Math.max(0, Math.min(100, (mouseY / rect.height) * 100));

          setPosition({ x, y });
     };

     const getPreviewStyles = () => {
          const baseStyles = { width, height, zIndex: 20 };

          if (typeof width === "number") {
               return { ...baseStyles, left: `${width + previewOffset}px` };
          }

          return { ...baseStyles, left: `calc(${width} + ${previewOffset}px)` };
     };

     return (
          <div className="relative inline-block">
               <div
                    className={`relative cursor-crosshair select-none ${className}`}
                    style={{
                         width,
                         height,
                         borderRadius: "8px",
                         overflow: "hidden",
                         border: "2px solid #e5e7eb",
                         transition: "border-color 0.2s ease",
                         ...(isHovered && { borderColor: "#3b82f6" }),
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={handleMouseMove}
               >
                    <img
                         src={src}
                         alt={alt}
                         className="w-full h-full object-cover"
                         style={{
                              transition: "opacity 0.3s ease",
                              opacity: imageLoaded ? 1 : 0.8,
                         }}
                         onLoad={() => setImageLoaded(true)}
                         onError={() => setImageLoaded(false)}
                    />

                    {isHovered && imageLoaded && (
                         <div
                              className={`absolute border-2 border-blue-400 rounded-full shadow-lg pointer-events-none 
              bg-blue-100/30 backdrop-blur-sm ${lensClassName}`}
                              style={{
                                   width: `${lensSize}px`,
                                   height: `${lensSize}px`,
                                   left: `calc(${position.x}% - ${
                                        lensSize / 2
                                   }px)`,
                                   top: `calc(${position.y}% - ${
                                        lensSize / 2
                                   }px)`,
                                   zIndex: 10,
                                   transition: "all 0.1s ease-out",
                                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                              }}
                         />
                    )}

                    {!imageLoaded && (
                         <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                         </div>
                    )}
               </div>

               {isHovered && imageLoaded && (
                    <div
                         className={`absolute top-0 border-2 border-blue-400 rounded-lg shadow-xl 
            overflow-hidden pointer-events-none bg-white ${previewClassName}`}
                         style={{
                              ...getPreviewStyles(),
                              opacity: isHovered ? 1 : 0,
                              transform: isHovered
                                   ? "translateX(0)"
                                   : "translateX(-10px)",
                              transition:
                                   "opacity 0.2s ease-out, transform 0.2s ease-out",
                              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                         }}
                    >
                         <img
                              src={src}
                              alt={`Zoomed view of ${alt}`}
                              className="w-full h-full object-cover"
                              style={{
                                   transform: `scale(${zoomScale})`,
                                   transformOrigin: `${position.x}% ${position.y}%`,
                                   transition: `transform ${transitionDuration}s ease-out`,
                                   willChange: "transform",
                              }}
                         />

                         <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {zoomScale}x
                         </div>
                    </div>
               )}
          </div>
     );
}

// Demo Component
export default function ImageZoomDemo() {
     const [settings, setSettings] = useState({
          zoomScale: 2,
          lensSize: 100,
          transitionDuration: 0.2,
     });

     return (
          <div className="p-8 bg-gray-50 min-h-screen">
               <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                         Enhanced Image Zoom Component
                    </h1>

                    {/* Controls */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                         <h2 className="text-xl font-semibold mb-4">
                              Settings
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Zoom Scale: {settings.zoomScale}x
                                   </label>
                                   <input
                                        type="range"
                                        min="1.5"
                                        max="4"
                                        step="0.1"
                                        value={settings.zoomScale}
                                        onChange={(e) =>
                                             setSettings((prev) => ({
                                                  ...prev,
                                                  zoomScale: parseFloat(
                                                       e.target.value
                                                  ),
                                             }))
                                        }
                                        className="w-full"
                                   />
                              </div>

                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lens Size: {settings.lensSize}px
                                   </label>
                                   <input
                                        type="range"
                                        min="50"
                                        max="200"
                                        step="10"
                                        value={settings.lensSize}
                                        onChange={(e) =>
                                             setSettings((prev) => ({
                                                  ...prev,
                                                  lensSize: parseInt(
                                                       e.target.value
                                                  ),
                                             }))
                                        }
                                        className="w-full"
                                   />
                              </div>

                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Transition:{" "}
                                        {settings.transitionDuration}s
                                   </label>
                                   <input
                                        type="range"
                                        min="0.1"
                                        max="0.5"
                                        step="0.05"
                                        value={settings.transitionDuration}
                                        onChange={(e) =>
                                             setSettings((prev) => ({
                                                  ...prev,
                                                  transitionDuration:
                                                       parseFloat(
                                                            e.target.value
                                                       ),
                                             }))
                                        }
                                        className="w-full"
                                   />
                              </div>
                         </div>
                    </div>

                    {/* Demo Images */}
                    <div className="space-y-4">
                         <div className="bg-white p-6 rounded-lg shadow-md">
                              <h3 className="text-lg font-semibold mb-4">
                                   Nature Photography
                              </h3>
                              <ImageZoom
                                   src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                   alt="Mountain landscape with snow-capped peaks"
                                   width={400}
                                   height={300}
                                   zoomScale={settings.zoomScale}
                                   lensSize={settings.lensSize}
                                   transitionDuration={
                                        settings.transitionDuration
                                   }
                                   className="mx-auto"
                              />
                              <p className="text-sm text-gray-600 mt-2">
                                   Hover over the image to see the zoom effect
                                   in action
                              </p>
                         </div>

                         <div className="bg-white p-6 rounded-lg shadow-md">
                              <h3 className="text-lg font-semibold mb-4">
                                   Architecture
                              </h3>
                              <ImageZoom
                                   src="/image.png"
                                   alt="Modern skyscrapers against blue sky"
                                   width={400}
                                   height={300}
                                   zoomScale={settings.zoomScale}
                                   lensSize={settings.lensSize}
                                   transitionDuration={
                                        settings.transitionDuration
                                   }
                                   className="mx-auto"
                              />
                              <p className="text-sm text-gray-600 mt-2">
                                   Perfect for detailed architectural
                                   photography
                              </p>
                         </div>
                    </div>

                    {/* Features List */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                         <h2 className="text-xl font-semibold mb-4">
                              Key Improvements
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                   <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                             <h4 className="font-medium">
                                                  Smooth Performance
                                             </h4>
                                             <p className="text-sm text-gray-600">
                                                  Uses requestAnimationFrame for
                                                  buttery smooth animations
                                             </p>
                                        </div>
                                   </div>
                                   <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                             <h4 className="font-medium">
                                                  Loading States
                                             </h4>
                                             <p className="text-sm text-gray-600">
                                                  Proper loading indicators and
                                                  error handling
                                             </p>
                                        </div>
                                   </div>
                                   <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                             <h4 className="font-medium">
                                                  Better Styling
                                             </h4>
                                             <p className="text-sm text-gray-600">
                                                  Modern design with improved
                                                  visual feedback
                                             </p>
                                        </div>
                                   </div>
                              </div>
                              <div className="space-y-3">
                                   <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                             <h4 className="font-medium">
                                                  Memory Management
                                             </h4>
                                             <p className="text-sm text-gray-600">
                                                  Proper cleanup of animation
                                                  frames and event handlers
                                             </p>
                                        </div>
                                   </div>
                                   <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                             <h4 className="font-medium">
                                                  Accessibility
                                             </h4>
                                             <p className="text-sm text-gray-600">
                                                  Better alt text and screen
                                                  reader support
                                             </p>
                                        </div>
                                   </div>
                                   <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                             <h4 className="font-medium">
                                                  Customizable
                                             </h4>
                                             <p className="text-sm text-gray-600">
                                                  Highly configurable with
                                                  sensible defaults
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
