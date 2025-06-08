"use client";
import "./App.css";
import { default as ImageZoomDemo } from "./components/ImageZoom";

function App() {
     return (
          <div className="container mx-auto mt-3 p-4">
               <h1 className="text-2xl font-bold mb-4">Image Zoom Demo</h1>

               <div>
                    {/* Regular Image */}
                    <div className="space-y-2">
                         <h2 className="text-lg font-semibold">
                              Regular Image
                         </h2>
                         <figure className="w-56 border rounded-lg overflow-hidden">
                              <img
                                   src="/image.png"
                                   alt="Sample product"
                                   className="w-full h-auto"
                              />
                         </figure>
                    </div>

                    {/* Zoomable Image */}
                    <div className="space-y-2">
                         <h2 className="text-lg font-semibold">
                              Zoomable Image
                         </h2>
                    </div>
               </div>

               <div>
                    <ImageZoomDemo />
               </div>

               <div className="mt-8 text-sm text-gray-600">
                    <p>
                         Hover over the right image to see the zoom effect. The
                         zoom preview will appear to the right.
                    </p>
               </div>
          </div>
     );
}

export default App;
