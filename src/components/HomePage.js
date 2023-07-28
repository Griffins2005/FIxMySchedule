import EventForm from "./EventForm";
import img from '../assests/way.jpg'
import images from '../assests/images.jpeg'
import LogoutButton from './Logout'

function HomePage() {
  return (
    <div className="home-container">
      <div className="logout-container"> {/* Add a container for the LogoutButton */}
        <LogoutButton />
      </div>
      <h1>Plan Your Schedule</h1>
      <p className="wel">WELCOME! 🤗</p>
      <div>
        <img className="way" src={img} alt="way" />
        <img className="way" src={images} alt="way" />
      </div>
      <div className="create-event-container">
        <h3>Create a new Event</h3>
      </div>
      <EventForm />
    </div>
  );
}

export default HomePage;
