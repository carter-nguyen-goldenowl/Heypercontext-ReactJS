import axios from "axios";
import {React,useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Modal from "../Modal";
import { toast } from "react-toastify";
import EditModal from "../EditModal";
import Pagination from "./Pagination";
export default function Contacts(){

  const [editData, setEditData] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [contacts, setContacts] = useState([]);
  
  const [searchData, SetSearchData] = useState('');

  // const [pagination, setPagination] = useState({
  //   current_page: 1,
  //   total: 5,
  // })

  useEffect(()=>{
    const fecthContacts = async() => {
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
    fecthContacts();
  },[contacts]);

  const addContacts = (contact) => {
    setContacts([...contacts, contact]);
  }

  const editContacts = (contact) => {
    let listContactsCopy = [...contacts];
    console.log(listContactsCopy);
    let objIndex = listContactsCopy.findIndex(item => item.id === contact.id);
    listContactsCopy[objIndex] = contact;
    setContacts(listContactsCopy);
  }

  const handleEditData = (id) => {
    const contact_current = contacts.find(item => item.id === id);
    setEditData([contact_current]);
  }
  
  const handleDeleteContacts = async(id) => {
    try {

      const response = await axios.delete(`api/contacts/${id}`);
      if(response.status === 200){
        toast.success("deleted Successfully");
      }
    } catch (error) {
      toast.error("You must login");
    }

    const newContactsList = contacts.filter((contact) => {
        return contact.id !== id;
    });
    setContacts(newContactsList);
  }

  const handleOnChangeSearch = (e) => {
    SetSearchData(e.target.value);
  }

  const searchContacts = async() => {
    try {

      const response = await axios.get(`api/contacts/search/${searchData}`);
      setContacts(response.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  // const handlePageChange = (newpage) => {
  //   console.log(newpage);
  // }

    return(
        <>
        <Navbar />
        <div className='py-6 md:py-12'>
          <div className="mb-3 xl:w-96 ml-6 mt-6">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
              <input value={searchData} onChange={handleOnChangeSearch} type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
                  <button onClick={searchContacts}
                  className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                    </svg>
                  </button>
            </div>

            {openModal && <Modal addContacts = {(contact) => addContacts(contact)} />}
          </div>
        <button type="button" onClick={() => {setOpenModal(true)}} className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-10"
                data-bs-toggle='modal'
                data-bs-target='#ContactModal'>
            create contacts
        </button>
          <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Name
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Email
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Phone
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Title
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Created_at
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Updated_at
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map(contact => (
                          <tr className="border-b" key={contact.id} >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.id}</td>
                            <td className="text-sm text-gray-900 font-mono px-6 py-4 whitespace-nowrap">{contact.name}</td>
                            <td className="text-sm text-gray-900 font-mono px-6 py-4 whitespace-nowrap">{contact.email}</td>
                            <td className="text-sm text-gray-900 font-mono px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                            <td className="text-sm text-gray-900 font-mono px-6 py-4 whitespace-nowrap">{contact.title}</td>        
                            <td className="text-sm text-gray-900 font-mono px-6 py-4 whitespace-nowrap">{contact.created_at}</td> 
                            <td className="text-sm text-gray-900 font-mono px-6 py-4 whitespace-nowrap">{contact.updated_at}</td>
                            <td>
                        
                              <button className="px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                      data-bs-toggle='modal'
                                      data-bs-target='#EditContactModal'
                                      onClick={(e) => {setOpenEditModal(true);handleEditData(contact.id)}}   
                              ><i className="fas fa-pen fa-xs"></i></button>
                              <button onClick={(e) => handleDeleteContacts(contact.id)} className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out " ><i className="fas fa-trash fa-xs"></i></button>
                            </td>
                          </tr>
                          
                        ))}
                      {openEditModal && <EditModal editData={editData} editContacts = {(contact) => editContacts(contact)}/>}
                      </tbody>
                    </table>
                    {/* <Pagination pagination={pagination} onPageChange = {handlePageChange}/> */}
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    );
}