import React from 'react'
import { API } from '../../backend'

export const getAllSongs = (user, token) => {
    return fetch(`${API}/songs/all`, {
        method: "GET",
        Authorization: `Bearer ${token}`
    })
}
