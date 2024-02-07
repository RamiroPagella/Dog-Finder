import { createslice } from '@reduxjs/toolkit';
import { DogType } from '../types';

interface InitialState {
  dogs: DogType[];
  page: number;
}