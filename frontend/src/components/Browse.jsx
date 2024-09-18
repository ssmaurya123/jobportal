// import React, { useEffect } from 'react'
// import Navbar from './shared/Navbar'
// import Job from './Job';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import useGetAllJobs from '@/hooks/useGetAllJobs';

// // const randomJobs=[1,2,3];

// const Browse = () => {
//     useGetAllJobs();
//     const {allJobs}=useSelector(store=>store.job)
//     const dispatch=useDispatch();
//     useEffect(() => {
//         return ()=>{
//             dispatch(setSearchedQuery(""))
//         }
//     }, [])
    
//   return (
//     <div>
//         <Navbar/>
//         <div  className='max-w-7xl mx-auto my-10'>
//         <h1 className='font-semibold text-xl my-10'>Search Results ({allJobs.length})</h1>
//         <div className='grid grid-cols-3 gap-4'>
//                     {
//                         allJobs.map((job) => {
//                             return (
//                                 <Job key={job._id} job={job} />
//                             )
//                         })
//                     }
//                 </div>
//         </div>
//     </div>
//   )
// }

// export default Browse

























import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion'; // Import motion

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(''));
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-semibold text-xl my-10'>
                    Search Results ({allJobs.length})
                </h1>
                <div className='grid grid-cols-3 gap-4'>
                    {allJobs.map((job) => {
                        return (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.25, 0.8, 0.5, 1] }} // Smooth transition
                                style={{ overflow: 'hidden' }} // Prevent scrollbars during animation
                            >
                                <Job job={job} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Browse;
