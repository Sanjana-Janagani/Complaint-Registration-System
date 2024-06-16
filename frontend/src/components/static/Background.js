import React from "react";
import FeatureCard from "./feature-card";
import Question from "./question";
import "./home.css";

const Background = (props) => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="home-hero1">

        </div>
      </div>
      <div className="home-details">
        <div className="home-details1">
          <div className="home-container02">
            <span className="home-text sectionTitle">
              <span>Details</span>
              <br></br>
            </span>
            <h2 className="home-details-heading heading2">
              Why Choose Our Complaint Registration System?
            </h2>
            <span className="home-details-sub-heading">
              This complaint registration system is designed to simplify the
              process of registering and managing complaints. With our intuitive
              interface and powerful features, you can easily track, prioritize,
              and resolve complaints in a timely manner. Our system also
              provides comprehensive reporting and analytics to help you
              identify trends and improve customer satisfaction. Experience the
              benefits of our complaint registration system today.
            </span>
          </div>
          <img
            alt="This will have college"
            src="https://cbit.ac.in/wp-content/uploads/2019/01/CBIT.jpg"
            className="home-details-image"
          />
        </div>
      </div>
      <div className="home-features">
        <div className="home-features-container">
          <div className="home-features1">
            <div className="home-container03">
              <h2 className="home-features-heading heading2">Key Features</h2>
              <span className="home-features-sub-heading">
                Discover the powerful features of our complaint registration
                system
              </span>
            </div>
            <div className="home-container04">
              <div style={{ marginRight: "50px" }}>
                <FeatureCard
                  Heading="User-friendly interface"
                  SubHeading="Easily navigate and use the complaint registration system with its intuitive and user-friendly interface."
                ></FeatureCard>
              </div>
              <div style={{ marginLeft: "50px" }}>
                <FeatureCard
                  Heading="Secure and confidential"
                  SubHeading="Rest assured that your complaints are handled securely and confidentially, ensuring your privacy and data protection."
                ></FeatureCard>
              </div>
              <div style={{ marginRight: "50px" }}>
                <FeatureCard
                  Heading="Real-time tracking"
                  SubHeading="Track the progress of your complaint in real-time, allowing you to stay updated on its status and resolution."
                ></FeatureCard>
              </div>
              <div style={{ marginLeft: "50px" }}>
                <FeatureCard
                  Heading="Multiple complaint channels"
                  SubHeading="Register complaints through various channels such as online forms, email, or phone, providing flexibility and convenience."
                ></FeatureCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-banner">
        <div className="home-banner1">
          <h1 className="home-banner-heading heading2">
            Efficient Complaint Management
          </h1>
          <span className="home-banner-sub-heading">
            Streamline your complaint handling process with our user-friendly
            system.
          </span>
          <button className="home-banner-button button">Learn More</button>
        </div>
      </div>
      <div className="home-faq">
        <div className="home-faq-container">
          <div className="home-faq1">
            <div className="home-container30">
              <span className="home-text40 sectionTitle">
                <span>FAQ</span>
                <br></br>
              </span>
              <h2 className="home-text43 heading2">Common questions</h2>
              <span className="home-text44">
                <span>
                  Here are some of the most common questions that we get.
                </span>
                <br></br>
                <span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                  </span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                  </span>
                </span>
                <span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                  </span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div className="home-container31">
              <Question
                Answer="A complaint registration system is a platform that allows individuals to submit complaints or grievances and track their progress."
                Question="What is a complaint registration system?"
              ></Question>
              <Question
                Answer="Using a complaint registration system provides a centralized and efficient way to submit and manage complaints. It ensures that your concerns are properly documented and addressed."
                Question="Why should I use a complaint registration system?"
              ></Question>
              <Question
                Answer="To register a complaint, you need to create an account on the platform and provide details about your complaint, such as the nature of the issue, relevant documents, and any supporting evidence."
                Question="How do I register a complaint using the system?"
              ></Question>
              <Question
                Answer="Yes, the complaint registration system allows you to track the progress of your complaint. You will receive updates on the status of your complaint and any actions taken to resolve it."
                Question="Can I track the progress of my complaint?"
              ></Question>
              <Question
                Answer="Yes, the complaint registration system ensures the security and confidentiality of your personal information. Your data is protected through encryption and strict access controls."
                Question="Is my personal information secure when using the system?"
              ></Question>
            </div>
          </div>
        </div>
      </div>
      <div className="home-footer">
        <footer className="home-footer1">
          <div className="home-container33">
            <span className="home-text61">
              © 2023 Complaint Registration Company, All Rights Reserved.
            </span>
            <div className="home-icon-group1">
              <svg viewBox="0 0 950.8571428571428 1024" className="home-icon10">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg viewBox="0 0 877.7142857142857 1024" className="home-icon12">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg viewBox="0 0 602.2582857142856 1024" className="home-icon14">
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Background;
