import React from 'react'
import { API } from '../../backend'

export const getAllTracks = (token) => {
    return fetch(`${API}/track/11dFghVXANMlKmJXsNCbNl`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}
