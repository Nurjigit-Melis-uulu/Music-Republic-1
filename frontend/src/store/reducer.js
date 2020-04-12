const initialState = {
  albums: null,
  tracks: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ALBUMS":
      return {
        ...state,
        albums: action.albums,
      };
    case "ADD_TRACKS":
      return {
        ...state,
        tracks: action.tracks,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
