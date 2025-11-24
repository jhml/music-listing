**Music Product System**

**Node Version**: 18.x (LTS recommended)

**Overview**

- **Project root**: `./` — contains `backend/` and `frontend/` folders.
- Simple music product management app with image uploads, authentication, and a React frontend.

**Quick Setup**

- **Prerequisites**: Ensure Node.js 18.x and npm are installed.

- Backend

  - Open a terminal and run:
    ```bash
    cd backend
    npm install
    ```
  - Create a `.env` file in `backend/` with at minimum:
    ```env
    JWT_SECRET=your_jwt_secret_here
    PORT=2001
    ```
  - Start backend (development):
    ```bash
    npm run dev
    ```
  - The backend serves API under `http://localhost:2001/api` and static uploads at `http://localhost:2001/uploads`.

- Frontend
  - In a separate terminal:
    ```bash
    cd frontend
    npm install
    npm run start
    ```
  - The front-end runs on the CRA dev server. By default it expects the API at `http://localhost:2001/api` (see `frontend/src/config.ts`).

**Running Tests**

- Frontend unit tests (Jest + React Testing Library):
  ```bash
  cd frontend
  npm run test
  ```

**Short Feature Summary**

- **Authentication**: JWT-based register/login endpoints in `backend/routes/auth`.
- **Products CRUD**: Create, read, update, delete product endpoints in `backend/routes/products`.
- **Image Uploads**: File uploads handled by `multer`, stored in `backend/uploads` and served statically.
- **Embedded DB**: Uses a local NeDB-based datastore (simple file-based DB) in `backend/data`.
- **Frontend**: React UI with forms for creating/editing products, product list, and responsive layout.

**What More Can Be Done (with rough time estimates)**

- **Add backend unit/integration tests** 
- **Persist images to cloud storage (S3/GCS)** — 4–8 hours: replace local `uploads/` storage with cloud storage and update the upload flow.
- **User management & roles** — admin/user roles, permission checks for editing/deleting products.
- **E2E tests (Cypress/Playwright)** — end-to-end tests exercising major user flows.
- **Polish UX / Responsive UI improvements** — refine styles, accessibility, keyboard navigation.

