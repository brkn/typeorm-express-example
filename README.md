# Typeorm Express Example

## Endpoints

- `GET /leaderboard`

  returns

  ```json
  [
    {
      "user_id": "995ea63a-5ecc-4f18-b271-5f46f661c975",
      "display_name": "DN_995ea63a-5ecc-4f18-b271-5f46f661c975",
      "country": "fr",
      "points": 3493,
      "rank": "1"
    },
    {
      "user_id": "0ac1a298-db42-4881-8f2b-3eff152f4609",
      "display_name": "DN_0ac1a298-db42-4881-8f2b-3eff152f4609",
      "country": "ca",
      "points": 3475,
      "rank": "2"
    },
    {
      "user_id": "2b945048-8d68-4992-8089-6cf46bf27dc9",
      "display_name": "DN_2b945048-8d68-4992-8089-6cf46bf27dc9",
      "country": "fr",
      "points": 1005,
      "rank": "499"
    }
  ]
  ```

- `GET /leaderboard/<COUNTRY_CODE>`

  ex: `/leaderboard/fr` returns

  ```json
  [
    {
      "user_id": "995ea63a-5ecc-4f18-b271-5f46f661c975",
      "display_name": "DN_995ea63a-5ecc-4f18-b271-5f46f661c975",
      "country": "fr",
      "points": 3493,
      "rank": "1"
    },
    {
      "user_id": "2b945048-8d68-4992-8089-6cf46bf27dc9",
      "display_name": "DN_2b945048-8d68-4992-8089-6cf46bf27dc9",
      "country": "fr",
      "points": 1005,
      "rank": "499"
    }
  ]
  ```

- `POST /user/create`

  ex payload:

  ```json
  {
    "user_id": string,
    "display_name": string,
    "country": string,
    "points": number
  }
  ```

  Note: Sending a ranking inside the payload is not allowed. This is intentional.

- `POST /user/create/batch`

  ex payload:

  ```json
  [
    {
      "user_id": string,
      "display_name": string,
      "country": string,
      "points": number
    },
    {
      "user_id": string,
      "display_name": string,
      "country": string,
      "points": number
    }
  ]
  ```

- `POST /user/create/batch-random`

  ex payload:

  ```json
  {
    "count": 123456
  }
  ```

- `GET /user/profile/<USER_ID>`

  ex response:

  ```json
  {
    "user_id": "995ea63a-5ecc-4f18-b271-5f46f661c975",
    "display_name": "DN_995ea63a-5ecc-4f18-b271-5f46f661c975",
    "country": "fr",
    "points": 3493,
    "rank": "1"
  }
  ```

- `POST /score/submit`

  ex payload:

  ```json
  {
    "user_id": "string",
    "timestamp": "string",
    "score_worth": 123.345
  }
  ```

## Local development

1. Install dependencies
   `yarn`

2. Run migrations
   `yarn typeorm migrations:run`

3. Run server
   `yarn dev`
