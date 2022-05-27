import React from 'react';
import PageTitle from '../Shared/PageTitle';

const MyPortFolio = () => {
    return (
        <div className='w-50 mx-auto'>
            <PageTitle title='My Portfolio' />
            <h2 className="display-5 pt-3 text-center">Welcome to My Portfolio</h2>
            <h3 className="fs-4">I am Md. Mahmudul Kabir</h3>
            <h4 className="fs-5">
                Faculty of Computer Science and Engineering <br />
                Department of Electronics and Communication Engineering <br />
                Level: 3 Semester: II <br />
                Hajee Mohammad Danesh Science and Technology University, Dinajpur
            </h4>
            <p className='m-0'>Email: mahmudulkabir990@gmail.com</p>
            <div className="d-flex">
                <div className='w-50'>
                    <p className='m-0 fw-bold'>List of technologies I learnt</p>
                    <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Bootstrap</li>
                        <li>Javascript</li>
                        <li>DevTool</li>
                        <li>ReactJS</li>
                        <li>ReactJS</li>
                        <li>Firebase</li>
                        <li>NodeJS</li>
                        <li>ExpressJS</li>
                        <li>MongoDB</li>
                        <li>Git and Github</li>
                    </ul>
                </div>
                <div>
                    <p className="m-0 fw-bold">Projects I have done</p>
                    <ul>
                        <li><a href="https://shoes-analyzer-kabir.netlify.app/" target="_blank" rel="noreferrer" className="text-decoration-none">Shoes Analyzer</a></li>
                        <li><a href="https://private-tutor-68671.web.app/" target="_blank" rel="noreferrer" className="text-decoration-none">Private Tutor</a></li>
                        <li><a href="https://fruits-valley-warehouse.web.app/" target="_blank" rel="noreferrer" className="text-decoration-none">Fruits Valley Warehouse</a></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default MyPortFolio;