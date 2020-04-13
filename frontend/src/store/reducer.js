const initialState = {
  albums: null,
  tracks: null,
  playingTrackIndex: 0,
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
    case "ADD_PLAYING_TRACK_INDEX":
      return {
        ...state,
        playingTrackIndex: action.index,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
