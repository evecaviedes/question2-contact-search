import { useEffect, useState } from "react";
import "./App.css";
import "./materialize.css";
import fetchCall from "./actions/fetch_call.tsx";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      fetchCall("https://jsonplaceholder.typicode.com/users", "GET", null).then(
        (result: any) => {
          setContacts(result);
          setFilteredData(result);
        }
      );
    }, 3000);

    return () => {};
  }, []);

  useEffect(() => {
    const filtered = contacts.filter((item) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [contacts, searchTerm]);

  const moreDetailsHandler = (contact: any) => {
    console.log(contact);
    setSelectedContact(contact);
  };

  const goBack = () => {
    setSelectedContact(null);
  };

  return (
    <div>
      <div>
        <h2>
          {selectedContact && selectedContact !== null
            ? "Contact Details"
            : "Contacts"}
        </h2>
      </div>
      {contacts && contacts.length === 0 && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
      {selectedContact === null && contacts && contacts.length > 0 && (
        <div className="search-filter">
          {" "}
          <input
            type="text"
            placeholder="Search your contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {selectedContact === null && filteredData && filteredData.length > 0 && (
        <table className="centered striped highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((contact: any) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.username}</td>
                <td>{contact.email}</td>
                <td
                  className="link-style"
                  onClick={() => moreDetailsHandler(contact)}
                >
                  More details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {contacts &&
        contacts.length > 0 &&
        filteredData &&
        filteredData.length === 0 && (
          <h5>There are not matches for the search</h5>
        )}
      {selectedContact && selectedContact !== null && (
        <div className="contact-details">
          <ul>
            <li>
              <strong>Name:</strong> {selectedContact?.name}
            </li>
            <li>
              <strong>Username:</strong> {selectedContact?.username}
            </li>
            <li>
              <strong>email:</strong> {selectedContact?.email}
            </li>
            <li>
              <strong>Phone:</strong> {selectedContact?.phone}
            </li>
            <li>
              <strong>Website:</strong> {selectedContact?.website}
            </li>
            <li>
              <strong>Company:</strong> {selectedContact?.company?.name}
            </li>
            <li>
              <strong>Address:</strong> {selectedContact?.address?.suite},
              {selectedContact?.address?.street},{selectedContact?.address?.city},
              {selectedContact?.address?.zipcode}
            </li>
          </ul>
          <button className="gb-color" onClick={() => goBack()}>
            Go back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
