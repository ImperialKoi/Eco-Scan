import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trash2, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { genSusAna } from "../components/genSusAna";

const GalleryPage = () => {
    const [photos, setPhotos] = useState([]);
    const [idx, setIdx] = useState(0);
    const [dir, setDir] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dispImage, setDispImage] = useState(null);
    const [dispBrand, setDispBrand] = useState(null);
    const [userId, setUserId] = useState("userId");
    const [description, setDescription] = useState("No description available");
    const [score, setScore] = useState(null);

    const navigate = useNavigate();

    const fetchPhotos = async () => {
        try {
            const res = await fetch("http://localhost:3500/fetch_img");
            if (!res.ok) throw new Error("Failed to fetch photo memo");

            const data = await res.json();
            const photoList = data.map(item => "data:image/jpeg;base64," + item);
            setIdx(photoList.length - 1);
            setPhotos(photoList);
        } catch (err) {
            console.error("Error fetching photos:", err);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const res = await fetch("http://localhost:3500/fetch_current_user");
            if (!res.ok) throw new Error("Failed to fetch user info");
            const data = await res.json();
            console.log(data);
            setUserId(data.id);

        } catch (err) {
            console.error("Error fetching photos:", err);
        }
    };

    useEffect(() => {
        fetchUserInfo();
        fetchPhotos();
    }, []);

    const deleteImg = async () => {
        const base64Idx = btoa(idx.toString());
        try {
            const response = await fetch("http://localhost:3500/delete_img", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: base64Idx }),
            });
            if (!response.ok) throw new Error("Failed to delete image");
            console.log(`Image ${idx} deleted successfully`);
        } catch (err) {
            console.error("Error deleting image:", err);
        }

        const deletedIdx = idx;
        await fetchPhotos();
        setIdx(Math.max(0, Math.min(photos.length - 2, deletedIdx)));
    };

    const handleIdxChange = (newIdx, direction) => {
        if (newIdx < 0 || newIdx >= photos.length || animating) return;
        setDir(direction);
        setAnimating(true);
        setTimeout(() => {
            setIdx(newIdx);
            setDir(0);
            setAnimating(false);
        }, 400);
    };

    const analyzeImg = async () => {
        setLoading(true);
        const frame = photos[idx];
        const base64String = frame.split(",")[1];
        const response = await fetch("http://localhost:3500/process_image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: base64String }),
        });
    
        if (!response.ok) throw new Error("Network response was not ok");
    
        const data = await response.json();
        console.log(data.brand);
        const pack = await genSusAna(data.brand, userId);
        setScore(pack.score);
        setDescription(pack.description);
        setDispBrand(data.brand);
        setDispImage("data:image/jpeg;base64," + data.image);
        setLoading(false);
    };
    

    return (
        <div className="relative h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {photos.length > 0 ? (
                    <div
                        key={idx}
                        className={`absolute w-full h-full transition-transform duration-300 ease-in-out
                            ${dir === 1 ? "translate-x-full" : dir === -1 ? "-translate-x-full" : "translate-x-0"}`}
                    >
                        <img
                            src={photos[idx]}
                            alt="Gallery"
                            className="w-full h-full object-contain"
                        />
                    </div>
                ) : (
                    <p className="text-white text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        No photos yet...
                    </p>
                )}

                {photos.length > 0 && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
                            onClick={() => handleIdxChange(idx - 1, -1)}
                        >
                            <ChevronLeft size={36} />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
                            onClick={() => handleIdxChange(idx + 1, 1)}
                        >
                            <ChevronRight size={36} />
                        </button>
                    </>
                )}

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-lg flex items-center justify-between px-6">
                    <div className="flex gap-3">
                        {photos.length > 0 && (
                            <>
                                <button
                                    className="text-white bg-white-10 hover:bg-red-600 p-2 rounded-lg transition"
                                    title="Delete Photo"
                                    onClick={deleteImg}
                                >
                                    <Trash2 size={20} className="text-black"/>
                                </button>
                                <button
                                    className="text-white bg-emerald-500/50 hover:bg-emerald-500/40 px-3 py-2 rounded-lg transition flex items-center gap-2"
                                    onClick={analyzeImg}
                                    title="Analyze for Sustainability"
                                >
                                    <Search size={20} className="text-black"/>
                                    <span className="text-sm text-black">Analyze brand</span>
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        className="text-black text-sm px-4 py-2 rounded-lg bg-black/10 hover:bg-white/20 transition"
                        onClick={() => navigate("/camera")}
                    >
                        Back to Camera
                    </button>
                </div>
            </div>
            
            {/* Popup */}
            {dispImage && (
            <div className="fixed inset-0 bg-white/30 backdrop-blur-xl z-50 flex items-center justify-center animate-fadeIn">
                <div className="bg-gray-300/20 rounded-xl shadow-2xl w-11/12 max-w-3xl max-h-[90vh] relative text-gray-900 border border-zinc-200 flex flex-col">
                
                {/* Header (fixed) */}
                <div className="sticky top-0 z-10 rounded-t-lg bg-gray-300 px-6 pt-6 pb-4 border-b border-zinc-200 flex items-start justify-between">
                    <h2 className="text-2xl font-semibold">Brand Analysis Result</h2>
                    <button
                    className="text-gray-800 hover:text-red-500 transition"
                    onClick={() => {
                        setDispImage(null);
                        setDispBrand(null);
                    }}
                    >
                    <X size={24} />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto p-6 space-y-6 bg-gray-200 rounded-b-xl">
                    <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Image Section */}
                    <div className="flex-1 flex items-center justify-center">
                        <img
                        src={dispImage}
                        alt="Analyzed"
                        className="rounded-lg border border-zinc-300 max-h-[60vh] object-contain"
                        />
                    </div>

                    {/* Brand Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">
                            Detected Brand
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                            {dispBrand || (
                            <span className="italic text-gray-500">None detected</span>
                            )}
                        </p>
                        </div>

                        <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                        <p>
                            <span className="font-semibold">Score:</span> {score}/10
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            {description.split(/[*]+/).map((line, i) =>
                                line.trim() ? <li key={i}>{line.trim()}</li> : null
                            )}
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {loading && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-white text-lg animate-pulse">Analyzing image...</div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
