import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import ContactCard from "../ContactCard/ContactCard";
import "./Contacts.css";
import Hidden from "@material-ui/core/Hidden"


const Contacts = () => {
  const { chats: contacts } = useContext(ChatContext);
  return (
    <div className="contacts">
      <Hidden only="lg">

      <div className="contacts__heading">
        <h1 style={{ color: "#ccc" }}> Contacts </h1>
      </div>
      </Hidden>
      <div className="contacts__list">
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
