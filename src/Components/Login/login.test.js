import React from 'react';
import ReactDOM from 'react-dom'; // use this to render
import Login from './login';
import {render,cleanup} from '@testing-library/react'; //this render diff from reactdom render
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
// import { rest } from 'msw';//these two mock an API request that our tested component makes.
// import { setupServer } from 'msw/node';
// import Axios from 'axios';

//cleanup cleans tests for you
afterEach(cleanup);
it("renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<Login></Login>,div)
})
//passed

it("renders form correctly",() =>{
    const {getByTestId} = render(<Login></Login>)
    expect(getByTestId("name")).toBeRequired()
})
//toBeRequired checks if an element is required
//passed

// test('login',() => {
//     loadLogin().then( =>{
//         expect(loginform).toBeEnabled();
//     })
// });

it("matches snapshot",() => {
    const tree = renderer.create(<Login></Login>).toJSON();
    expect(tree).toMatchSnapshot();
})
//snapshot testing useful for making sure UI doesnt change unexpectedly
//snapshot testing is provided by Jest and verifies the component rendering result
