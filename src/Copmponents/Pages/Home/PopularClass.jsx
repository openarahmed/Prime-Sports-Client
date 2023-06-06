import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const PopularClass = () => {
    const [popular, setPopular] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(datas => setPopular(datas))
    }, [])
    return (
        <div>
            <h1 className='text-5xl text-center my-10 font-bold'>Popular Classes</h1>
            <div className='grid grid-cols-3 gap-7'>
                {
                    popular.map(d => <div key={d._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure><img className='w-[400px] h-[350px]' src={d.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{d.title}</h2>
                            <p>Students: {d.numberOfStudents}</p>
                            
                        
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClass;