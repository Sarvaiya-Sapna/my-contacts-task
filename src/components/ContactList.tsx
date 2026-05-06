import type { ContactListData } from "../types/types";

interface Props {
  contact: ContactListData;
}

function ContactList({ contact }: Props) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card h-100 p-3 card-hover d-flex flex-column"
        style={{ height: "300px" }}
      >
        <div className="flex-shrink-0">
          <img
            src={contact.avatar}
            className="card-img-top contact-img"
            alt={contact.avatar}
          />
        </div>

        <div className="card-body overflow-auto">
          <h5 className="card-title">{contact.first_name}</h5>

          <p className="text-muted">{contact.last_name}</p>

          <p className="card-text">{contact.mobile}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
