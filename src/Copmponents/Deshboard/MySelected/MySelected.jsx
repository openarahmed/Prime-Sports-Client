import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCart from '../../Hooks/useCart';

const MySelected = () => {
    const [data, refetch] = useCart()
    const filterd = data.filter(d => d.status == 'unpaid')
    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://prime-sports-server.vercel.app/carts/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                        }


                    })
            }
        })

    }
    return (
        <div className='w-full'>
            <h1 className='text-3xl font-bold my-7 text-center'>My Selected Classes: {filterd.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterd.map((d, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{d.title}</td>
                                <td>{d.email}</td>

                                <td><Link to={`/deshboard/payment/${d._id}`} className='btn btn-sm'>PaY</Link></td>
                                <td><Link onClick={() => handleDelete(d._id)} className='btn btn-sm'>Delete</Link></td>
                            </tr>

                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelected;