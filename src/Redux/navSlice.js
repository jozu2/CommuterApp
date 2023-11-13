import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestHide: false,
  saveDriverId: null,
  registrationInfo: {
    fullName: null,
    emailAdd: null,
    mobileNo: null,
    pass: null,
    gender: null,
    selectedFaculty: null,
    address: null,
    teacherID: null,
  },

  savedImage: null,
  rideStarted: false,

  userCount: 1,
  origin: {
    latitude: null,
    longitude: null,
    description: null,
    title: null,
  },
  waypoints: { latitude: null, longitude: null },
  destination: {
    latitude: null,
    longitude: null,
    description: null,
    title: null,
  },
  destination: {
    latitude: null,
    longitude: null,
    description: null,
  },
  viewBookings: null,
  userProfile: { info: null, id: null },
  createdRideInfo: {
    driverInfo: { fullName: null, driverId: null },
    origin: {
      latitude: null,
      longitude: null,
      description: null,
      img1: null,
      img2: null,
    },
  },
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setRequestHide: (state, action) => {
      state.requestHide = action.payload;
    },
    setRideStarted: (state, action) => {
      state.rideStarted = action.payload;
    },
    setSaveDriverId: (state, action) => {
      state.saveDriverId = action.payload;
    },
    setUserCount: (state, action) => {
      state.userCount = action.payload;
    },
    setRegistrationInfo: (state, action) => {
      state.registrationInfo = action.payload;
    },
    setSavedImage: (state, action) => {
      state.savedImage = action.payload;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },

    setDestination: (state, action) => {
      state.destination = action.payload;
    },

    setWaypoints: (state, action) => {
      state.waypoints = action.payload;
    },
    setViewBookings: (state, action) => {
      state.viewBookings = action.payload;
    },

    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    setCreatedRideInfo: (state, action) => {
      state.createdRideInfo = action.payload;
    },
  },
});

export const {
  setRequestHide,
  setSaveDriverId,
  setRideStarted,
  setUserCount,
  setRegistrationInfo,
  setSavedImage,
  setOrigin,
  setDestination,
  setWaypoints,
  setViewBookings,
  setUserProfile,
  setCreatedRideInfo,
} = navSlice.actions;
export const selectRequestHide = (state) => state.nav.requestHide;
export const selectSaveDriverId = (state) => state.nav.saveDriverId;
export const selectRideStarted = (state) => state.nav.rideStarted;
export const selectUserCount = (state) => state.nav.userCount;
export const selectRegistrationInfo = (state) => state.nav.registrationInfo;
export const selectOrigin = (state) => state.nav.origin;
export const selectSavedImage = (state) => state.nav.savedImage;
export const selectDestination = (state) => state.nav.destination;
export const selectWaypoints = (state) => state.nav.waypoints;
export const selectViewBookings = (state) => state.nav.viewBookings;
export const selectUserProfile = (state) => state.nav.userProfile;
export const selectCreatedRideInfo = (state) => state.nav.createdRideInfo;

export default navSlice.reducer;
