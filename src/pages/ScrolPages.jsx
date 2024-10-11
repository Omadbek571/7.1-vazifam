import React, { useEffect, useState } from 'react';
import imgDef from "../imges/user.jpg"; 

function ScrolPages() {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=${limit}`);
                const newData = await res.json();
                setData((prevData) => [...prevData, ...newData]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [offset]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const currentHeight = document.documentElement.scrollTop + window.innerHeight;
            if (currentHeight + 1 >= scrollHeight) {
                setOffset((prevOffset) => prevOffset + limit);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-pink-200 flex flex-col justify-center items-center p-10">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-6xl">
                <h1 className="text-4xl font-bold text-center mb-4">Scrollable Photos</h1>
                <p className="text-center text-gray-500 mb-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam facilis eaque reiciendis, reprehenderit cum eos?
                </p>
                <div className="product-list flex flex-wrap justify-center">
                    {data.length > 0 && data.map((value, index) => (
                        <div className='product-item w-52 max-w-xs h-72 m-4 bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300' key={index}>
                            <img src={value.thumbnailUrl || imgDef} alt={value.title} className="w-full h-40 object-cover" />
                            <div className='product-info p-4'>
                                <h4 className='product-name text-lg font-bold text-gray-800 mb-2 truncate'>{value.title}</h4>
                                <h4 className='product-id text-sm text-gray-500'>ID: {value.id}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                {data.length === 0 && <p className="text-center">Topilmadi...</p>}
            </div>
        </div>
    );
}

export default ScrolPages;
