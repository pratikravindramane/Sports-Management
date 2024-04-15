// AboutUsPage.js
import React from "react";

const AboutUsPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Us</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRu-zYFwoSJxDpt8rj8HVgUUtcVlWtTEz81zM1aE8gVcKmnhlkKn42MmCHZ85z0VzI_I&usqp=CAU"
            width={"100%"}
            className="img-fluid"
            alt="About Us"
          />
        </div>
        <div className="col-md-6">
          <p>
            Our sports event management project offers a comprehensive solution
            for organizing and overseeing sports events with ease.
            Administrators hold the reins, empowered to add, delete, and manage
            various elements such as events, teams, users, and teachers. This
            level of control ensures that every aspect of sports coordination is
            finely tuned to perfection, guaranteeing a seamless experience for
            all involved.
          </p>
          <p>
            Teachers play a crucial role within our platform, equipped with the
            ability to create teams, provide valuable feedback, and update event
            results. Their expertise adds depth to the sports management
            process, enhancing the overall quality of events and fostering a
            supportive environment for participants to thrive.
          </p>
          <p>
            Students are at the forefront of our sports event management
            project, with features tailored to their needs. Through simple login
            and signup processes, they gain access to a world of sporting
            opportunities, where they can register for events, discover their
            team assignments, and stay updated on event results. This seamless
            user experience encourages active participation and engagement in
            sporting activities.
          </p>
          <br />
          <p>
            With our user-friendly interface, administrators can navigate the
            intricacies of event management effortlessly. Whether it's adding
            new events to the calendar, creating and organizing teams, or
            managing user accounts, our platform streamlines the entire process,
            saving time and ensuring that every detail is handled with
            precision.
          </p>
          <p>
            Our commitment to excellence extends beyond just organizing events;
            we provide a platform where sports enthusiasts can come together to
            celebrate their passion. Through efficient management and robust
            features, we aim to create an environment where the spirit of
            sportsmanship thrives, fostering camaraderie, skill development, and
            unforgettable experiences for all involved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
