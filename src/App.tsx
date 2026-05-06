import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import { fetchContacts } from "./services/contactListData";
import type { ContactListData } from "./types/types";

function App() {
  const [contacts, setContacts] = useState<ContactListData[]>([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = fetchContacts;
        setContacts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    let updatedContacts = [...contacts];

    if (debouncedSearch) {
      updatedContacts = updatedContacts.filter((contact) =>
        Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      );
    }

    return updatedContacts;
  }, [contacts, debouncedSearch]);

  return (
    <div className="container app-wrapper">
      <div className="card p-4 main-card">
        <h2 className="text-center text-primary mb-4">My Contacts</h2>

        <div className="row mb-4">
          <div className="col-md-8 mb-3">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : (
          <div
            className="contact-list-container"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <div className="row">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <ContactList key={contact.id} contact={contact} />
                ))
              ) : (
                <h5 className="text-center">No Contacts Found</h5>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
