# Project Name

<br>

# Quick Compo

<br>

## Description

This is an app to search small local restaurants and give them reviews.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start searching restaurants.
- **Login:** As a user I can login to the platform so that I can access my profile and search restaurants based on my location and preferences.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **User Profile Page Visitor**: As a logged in visitor I can visit my profile page so that I can access the edit page, see and manage all my favourite restaurants and see my activity in comment section.
- **View Restaurants List:** As a user I want to see all the restaurants and also serch the ones that meet my criteria.
- **View Restaurant Details:** As a user I would like to see the retaurant details, and give reviews. Aso, I would like to edit or delete reviews.
- **User Profile Page Admin**: As a logged in admin I can visit my profile page so that I can access the edit page, and see and manage all the restaurants in the database.
- **Add Restaurants:** As a logged in admin I can access the add restaurants page so that I can add a new restaurant.
- **Edit Restaurants:** As a logged in admin I can access the edit restaurant page so that I can update it.
- **Delete Restaurants:** As a logged in admin I can delete a restaurant from the database.

## Backlog

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                              | Component             | Permissions                 | Behavior                                          |
| --------------------------------- | --------------------- | --------------------------- | ------------------------------------------------- |
| `/login`                          | LoginPage             | anon only `<AnonRoute>`     | Login form, navigates to home page after login.   |
| `/signup`                         | SignupPage            | anon only `<AnonRoute>`     | Signup form, navigates to home page after signup. |
| `/`                               | HomePage              | public `<Route>`            | Home page.                                        |
| `/profile`                        | ProfilePage           | user only `<PrivateRoute>`  | User profile for the current user.                |
| `/profile/edit`                   | EditProfilePage       | user only `<PrivateRoute>`  | Edit user profile form.                           |
| `/restaurants`                    | RestaurantListPage    | user only `<PrivateRoute>`  | Restaurants list.                                 |
| `/restaurants/add`                | CreateRestaurantPage  | admin only `<PrivateRoute>` | Create a new restaurant.(admin)                   |
| `/restaurants/edit/:restaurantId` | EditRestaurantPage    | user only `<PrivateRoute>`  | Edit restaurant (admin).                          |
| `/restaurants/:restaurantId`      | RestaurantDetailsPage | user only `<PrivateRoute>`  | Restaurant details. Shows info about restaurants. |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- RestaurantListPage

- CreateRestaurantPage

- EditRestaurantPage

- RestaurantDetailsPage

Components:

- Navbar
- SearchBar
- RestaurantListCard
- RestaurantDetailsCard
- AddCommentCard



## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Tournament Service**

  - `tournamentService` :
    - `.addTournament(tournamentData)`
    - `.getTournaments()`
    - `.getOneTournament(id)`
    - `.deleteTournament(id)`

- **Player Service**

  - `playerService` :
    - `.createPlayer(id)`
    - `.getPlayerDetails(id)`

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

	playerProfile: { type: Schema.Types.ObjectId, ref:'Player' },
  createdTournaments: [ { type: Schema.Types.ObjectId, ref:'Tournament' } ]
}
```

**Tournament model**

```javascript
 {
   name: { type: String, required: true },
   img: { type: String },
   players: [ { type: Schema.Types.ObjectId, ref:'Player' } ],
   games: [],
   rankings: []
 }
```

**Player model**

```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileImage: { type: String },
  scores: []
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile `       | Saved session                | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/tournaments`     |                              |                | 400          | Show all tournaments                                                                                                            |
| GET         | `/api/tournaments/:id` |                              |                |              | Show specific tournament                                                                                                        |
| POST        | `/api/tournaments`     | { name, img, players }       | 201            | 400          | Create and save a new tournament                                                                                                |
| PUT         | `/api/tournaments/:id` | { name, img, players }       | 200            | 400          | edit tournament                                                                                                                 |
| DELETE      | `/api/tournaments/:id` |                              | 201            | 400          | delete tournament                                                                                                               |
| GET         | `/api/players/:id`     |                              |                |              | show specific player                                                                                                            |
| POST        | `/api/players`         | { name, img, tournamentId }  | 200            | 404          | add player                                                                                                                      |
| PUT         | `/api/players/:id`     | { name, img }                | 201            | 400          | edit player                                                                                                                     |
| DELETE      | `/api/players/:id`     |                              | 200            | 400          | delete player                                                                                                                   |
| GET         | `/api/games`           |                              | 201            | 400          | show games                                                                                                                      |
| GET         | `/api/games/:id`       |                              |                |              | show specific game                                                                                                              |
| POST        | `/api/games`           | {player1,player2,winner,img} |                |              | add game                                                                                                                        |
| PUT         | `/api/games/:id`       | {winner,score}               |                |              | edit game                                                                                                                       |

<br>

## API's

<br>

## Packages

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>
