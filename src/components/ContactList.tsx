import type { ContactListData } from "../types/types";

interface Props {
  contact: ContactListData;
  search: string;
}

function ContactList({ contact, search }: Props) {
  const highlightText = (text: string) => {
    if (!search) return text;

    const searchChars = search.toLowerCase().split("");

    return text.split("").map((char, index) => {
      const isMatch = searchChars.includes(char.toLowerCase());

      return isMatch ? (
        <span
          key={index}
          style={{
            color: "blue",
            fontWeight: "bold",
          }}
        >
          {char}
        </span>
      ) : (
        char
      );
    });
  };
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
          <h5 className="card-title">{highlightText(contact.first_name)}</h5>

          <p className="text-muted">{highlightText(contact.last_name)}</p>

          <p className="card-text">{highlightText(contact.mobile)}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
