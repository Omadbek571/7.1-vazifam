import React, { useState, useEffect } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgDef from "../imges/user.jpg";

function Home() {
    const [page, setPage] = useState(1);
    const [limits, setLimit] = useState(8);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limits}`)
            .then(res => res.json())
            .then(data => {
                setPhotos(data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limits]);

    return (
        <div className="min-h-screen bg-pink-200 flex flex-col justify-center items-center p-10">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-2">Food Blog</h1>
                <p className="text-center text-gray-500 mb-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, dolorum doloribus. Sapiente ex earum dolore.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: limits }).map((_, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img
                                    src={imgDef}
                                    alt="Default"
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-800">Yuklanmoqda...</h3>
                                </div>
                            </div>
                        ))
                    ) : photos.length > 0 ? (
                        photos.map(photo => (
                            <div key={photo.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img
                                    src={photo.thumbnailUrl}
                                    alt={photo.title}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-800">{photo.title}</h3>
                                    <p className="text-sm text-gray-600">ID: {photo.id}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-4 text-center">Topilmadi...</p>
                    )}
                </div>

                <div className="flex justify-center mt-6">
                    <PaginationControl
                        page={page}
                        between={4}
                        total={5000}
                        limit={limits}
                        changePage={newPage => setPage(newPage)}
                        ellipsis={1}
                        className="pagination justify-content-center"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
