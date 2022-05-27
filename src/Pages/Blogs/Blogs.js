import React from 'react';
// import PageTitle from '../shared/PageTitle/PageTitle';
import './Blogs.css';

const Blogs = () => {
    return (
        <div className='blogs mx-auto my-4 pt-3'>
            {/* <PageTitle title="Blogs"></PageTitle> */}
            <div className='border border-5 border-warning p-3 m-3 blog'>
                <h2 className='fs-5 fw-normal text-center'>How will you improve the performance of a React Application?</h2>
                <p className="fw-light">
                    I will keep component state local where necessary.
                    Memoizing React components to prevent unnecessary re-renders is a good option. Code-splitting in React using dynamic import improves performance. So it should be applied. Also windowing or list virtualization should be applied. Lastly avoid lazy loading images.
                </p>
            </div>
            <div className='border border-5 border-warning p-3 m-3 blog'>
                <h2 className='fs-5 fw-normal text-center'>What are the different ways to manage a state in a React application?</h2>
                <p className='fw-light'>
                    There are four main types of state to properly manage any React apps: Local state, Global state, Server state and URL state. <br /><br />
                    <li>Local state: Local state is data we manage in one or another component. It is most often managed in React using the useState hook.</li>
                    <li>Global state: Global state is data we manage across multiple components.</li>
                    <li>Server state: Data that comes from an external server that must be integrated with our UI state.</li>
                    <li>URL state: Data that exists on our URLs, including the pathname and query parameters.</li>
                </p>
            </div>
            <div className='border border-5 border-warning p-3 m-3 blog'>
                <h2 className='fs-5 fw-normal text-center'>How does prototypical inheritance work?</h2>
                <p className="fw-light">
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object.
                </p>
            </div>
            <div className='border border-5 border-warning p-3 m-3 blog'>
                <h2 className='fs-5 fw-normal text-center'>Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h2>
                <p className='fw-light'>useState is a hook of REACT. It has two part, a variable and a function. [product, setProduct] is a syntax of this hook. The main fact that made the hook useful is when the value is set by setProduct, it applies to whole component. But if products=[...] is set, the value won't be applied to the whole component and the app won't be updated.</p>
            </div>
            <div className='border border-5 border-warning p-3 m-3 blog'>
                <h2 className='fs-5 fw-normal text-center'>You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>
                <p className='fw-light'>I will simply use the array.filter function.  Example will be like: <code>const result = products.filter( product ={'>'} product.name)</code> </p>
            </div>
            <div className='border border-5 border-warning p-3 m-3 blog'>
                <h2 className='fs-5  fw-normal text-center'>What is a unit test? Why should write unit tests?</h2>
                <p className='fw-light'>Unit testing is a process where testing individual components of the software program or application. The main purpose behind this is to check that all the individual parts are working as intended. A unit is known as the smallest possible component of software that can be tested. Generally, it has a few inputs and a single output.
                    <br /><br />
                    Unit testing allows software developers to actually think through the design of the software and what has to be done before they write the code. This can help them to stay focused and can also help them to create much better designs.
                </p>
            </div>
        </div>
    );
};

export default Blogs;