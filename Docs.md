# Technical Documentation

## 1. Repository URL

The repository for the backend system can be found at the following URL:

- **GitHub Repository:** [Link to Repository](https://github.com/sultanfariz/bunder)

## 2. Functional & Non-Functional Requirements

### 2.1 Functional Requirements

1. **User Registration:** Users can register with an email, password, name, and other necessary details.
2. **User Authentication:** Implement secure login and logout functionality.
3. **Profile Management:** Users can update their profile information, including bio, hobbies, and photo URLs.
4. **Matchmaking:** Users can search for and match with other users based on preferences and location.
5. **Chatting:** Users can communicate with matched users via chat.

### 2.2 Non-Functional Requirements

1. **Scalability:** The system should handle a growing number of users and messages.
2. **Performance:** The backend should respond to requests in under 200ms.
3. **Security:** Implement data encryption, secure authentication, and protection against common web vulnerabilities.
4. **Maintainability:** The codebase should be modular, well-documented, and easy to maintain.

## 3. Tech Stack

### 3.1 Backend Framework

- **Bun:** Chosen for its performance, simplicity, and scalability. It is a lightweight web framework for TypeScript.

### 3.2 Database

- **MySQL:** Selected for its simplicity, performance, and scalability. It is a popular relational database that can handle large amounts of data.

### 3.3 API

- **RESTful API:** Used for communication between the frontend and backend. It is simple, stateless, and easy to implement.

### 3.4 Containerization

- **Docker:** Used for containerization to ensure consistent deployment across different environments.

### 3.5 Reasoning Behind Choices

- **Flexibility:** TypeScript provides static typing and modern features that make development easier and more reliable.
- **Simplicity:** Bun's minimalistic design and clear structure make it easy to learn and work with. It is well-suited for small to medium-sized projects.

## 4. System Design

### 4.1 Entity Relationship Diagram (ERD)

- **ERD Overview:**
  - Users
  - Preferences
  - Packages
  - Subscriptions
  - Swipes
  - Matches
  - Messages

### 4.2 Sequence Diagram

```plaintext
User A            Backend            Database            User B
 |                   |                  |                  |
 |----Register/----->|                  |                  |
 |----Login----------|                  |                  |
 |                   |---Save User----->|                  |
 |                   |<---User Saved----|                  |
 |                   |                  |                  |
 |<--Auth Token------|                  |                  |
 |                   |                  |                  |
 |--Update Profile-->|                  |                  |
 |                   |---Save Profile-->|                  |
 |                   |<--Profile Saved--|                  |
 |                   |                  |                  |
 |<--Profile Updated-|                  |                  |
 |                   |                  |                  |
 |-Update Prefernc-->|                  |                  |
 |                   |--Save Prefernc-->|                  |
 |                   |<-Prefernc Saved--|                  |
 |                   |                  |                  |
 |<-Prefernc Updated-|                  |                  |
 |                   |                  |                  |
 |--Discover Users-->|                  |                  |
 |                   |---Query Matches->|                  |
 |                   |<--Return Matches-|                  |
 |<--Show Profiles---|                  |                  |
 |                   |                  |                  |
 |--Swipe Right----->|                  |                  |
 |                   |---Save Swipe---->|                  |
 |                   |<--Swipe Saved----|                  |
 |                   |                  |                  |
 |                   |                  |                  |
 |                   |<--Swipe Right----|----Swipe Right---|
 |                   |----Save Swipe--->|                  |
 |                   |                  |                  |
 |                   |---Match Occurs-->|                  |
 |                   |<---Match Saved---|                  |
 |                   |                  |                  |
 |----Send Message-->|                  |                  |
 |                   |---Store Message->|                  |
 |                   |<--Message Stored-|                  |
 |                   |                  |                  |
 |                   |------------------|--Receive Msg---->|
 |                   |                  |                  |
 |                   |<--Read Receipt---|--Read Receipt----|
 |                   |---Save Receipt-->|                  |
 |                   |<--Receipt Saved--|                  |
 |<--Receipt Sent----|                  |                  |
 |---View Receipt--->|                  |                  |

```

## 5. Test Cases

### 5.1 User Registration

Test Case 1: Validate user registration with valid/invalid inputs.
Expected Result: Successful registration with valid data, error messages for invalid data.

Test Case 2: Verify that the system does not allow duplicate email registrations.
Expected Result: Error message displayed when trying to register with an existing email.

### 5.2 User Authentication

Test Case: Verify login with correct and incorrect credentials.
Expected Result: Access granted for correct credentials, denied for incorrect.

### 5.3 Profile Management

Test Case 1: Test updating user profile information.
Expected Result: Profile updated successfully and data persisted.

Test Case 2: Test uploading profile photos.
Expected Result: Photos uploaded successfully and displayed on the profile.

Test Case 3: Updating user preferences (age range, max distance).
Expected Result: Preferences updated successfully and used for matchmaking.

Test Case 4: User can choose and upgrade to any of the premium plans.
Expected Result: User subscription is updated and premium features are enabled.

### 5.4 Matchmaking

Test Case 1: Ensure users can discover other users based on preferences.
Expected Result: Users can discover and match with other users based on preferences.

Test Case 2: Users can view one profile at a time and swipe left or right.
Expected Result: Only one profile is shown at a time and not changeable until swiped.

Test Case 3: Users can view a list of matched users.
Expected Result: List of matched users is displayed.

Test Case 4: Two users swipe right on each other.
Expected Result: Match occurs when both users swipe right on each other.

Test Case 5: Discover other users with basic plan.
Expected Result: Basic users are limited to 10 matches daily.

Test Case 6: Discover other users with Unlimited Swipe plan.
Expected Result: Unlimited swipes for users with Unlimited Swipe plan.

Test Case 7: Discover other users that subscribed to Verified Badge plan.
Expected Result: Users with Verified Badge plan are shown first in the list.

Test Case 8: Discover other users after swiping either left or right.
Expected Result: Users that have been swiped left are not shown again.

### 5.5 Chatting

Test Case 1: Test sending and receiving messages.
Expected Result: Messages are sent and received without errors.

Test Case 2: Read receipts for messages.
Expected Result: Read receipts are displayed when a message is read.
