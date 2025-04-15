// components/TeamPage.jsx
function TeamPage() {
    const teamMembers = [
      {
        id: 1,
        name: "Alex Johnson",
        role: "Lead Developer",
        bio: "Full-stack developer with 5 years of experience in React and Node.js. Alex led the architectural design of SmartVend.",
        image: "/api/placeholder/200/200"
      },
      {
        id: 2,
        name: "Sam Rivera",
        role: "UI/UX Designer",
        bio: "With a background in human-computer interaction, Sam created the intuitive interface that makes SmartVend so user-friendly.",
        image: "/api/placeholder/200/200"
      },
      {
        id: 3,
        name: "Jordan Taylor",
        role: "Backend Developer",
        bio: "Jordan implemented the secure payment processing system and inventory management backend for SmartVend.",
        image: "/api/placeholder/200/200"
      },
      {
        id: 4,
        name: "Morgan Patel",
        role: "QA Engineer",
        bio: "Morgan's extensive testing protocols ensured that SmartVend works flawlessly across all devices and scenarios.",
        image: "/api/placeholder/200/200"
      }
    ];
  
    return (
      <div className="team-page">
        <div className="container">
          <h1 className="page-title">Our Team</h1>
          <p className="team-description">Meet the talented individuals who made SmartVend possible. Our diverse team brings together expertise in development, design, and user experience.</p>
          
          <div className="team-grid">
            {teamMembers.map(member => (
              <div className="team-member" key={member.id}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default TeamPage;