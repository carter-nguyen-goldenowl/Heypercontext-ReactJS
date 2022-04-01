import axios from "axios";
import { React, useState } from "react";
import { toast } from "react-toastify";

export default function Modal(props) {
  const currentDate = new Date();

  const [addcontactsInput, setAddContacts] = useState({
    email: "",
    name: "",
    phone: "",
    title: "",
    created: `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
    errors_list: [],
  });

  const handleInput = (e) => {
    let key = e.target.name;
    let val = e.target.value;

    setAddContacts({ ...addcontactsInput, [key]: val });
  };

  const handleAddContactsSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: addcontactsInput.name,
      email: addcontactsInput.email,
      title: addcontactsInput.title,
      phone: addcontactsInput.phone,
      created: addcontactsInput.created,
    };
    try {
      const response = await axios.post("/api/contacts", data);
      if (response.status === 201) {
        props.addContacts(response.data);
        toast.success("Created Successfully");
      }
    } catch (error) {
      toast.error("You must login");
    }
  };

  return (
    <div>
      <div
        className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
        id='ContactModal'
        tabIndex={-1}
        aria-labelledby='exampleModalLongLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog relative w-auto pointer-events-none'>
          <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
            <div className='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
              <h5 className='text-xl font-medium leading-normal text-gray-800' id='ContactModal'>
                Create Contact
              </h5>
              <button
                type='button'
                className='btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <form>
              <div className='modal-body relative p-4'>
                <div className='mb-6'>
                  <input
                    type='email'
                    className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    name='email'
                    placeholder='Email address'
                    value={addcontactsInput.email}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
              </div>
              <div className='modal-body relative p-4'>
                <div className='mb-6'>
                  <input
                    type='text'
                    className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    name='name'
                    placeholder='Name'
                    value={addcontactsInput.name}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
              </div>
              <div className='modal-body relative p-4'>
                <div className='mb-6'>
                  <input
                    type='text'
                    className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    name='title'
                    placeholder='Title'
                    value={addcontactsInput.title}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
              </div>
              <div className='modal-body relative p-4'>
                <div className='mb-6'>
                  <input
                    type='phone'
                    className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    name='phone'
                    placeholder='Phone'
                    value={addcontactsInput.phone}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
              </div>
              <div className='modal-body relative p-4'>
                <div className='mb-6'>
                  <input
                    type='datetime'
                    className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    value={addcontactsInput.created}
                    name='created'
                    placeholder='Create at'
                  />
                </div>
              </div>
            </form>
            <div className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
              <button
                type='button'
                className='inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                onClick={handleAddContactsSubmit}
                className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1'
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
