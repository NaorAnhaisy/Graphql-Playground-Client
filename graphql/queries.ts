import { gql } from "@apollo/client";

const getAllBooks = gql`
  query {
    books {
      id
      name
      genre
      author {
        id
        name
        books {
          name
          genre
        }
      }
    }
  }
`;

const getAllAuthors = gql`
  query {
    authors {
      id
      name
      age
    }
  }
`;

const getSpecificBook = gql`
  query book($bookID: ID!) {
    book(id: $bookID) {
      id
      name,
      author {
        name
        age
        books {
          name
        }
      }
    }
  }
`;

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorID: ID!) {
    addBook(name: $name, genre: $genre, authorID: $authorID) {
      id
      name
    }
  }
`;

export { getAllBooks, getAllAuthors, getSpecificBook, addBookMutation };
