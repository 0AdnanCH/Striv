import { combineReducers } from '@reduxjs/toolkit';
import trainerReducer from '../modules/trainer/store/trainer.slice';

export const rootReducer = combineReducers({
  trainer: trainerReducer,
});