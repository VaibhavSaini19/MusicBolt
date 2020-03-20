import React from 'react'

const SongItem = ({ song }) => {
    return (
        <div className="card">
            <div className="card-title">
                {song.id}
            </div>
            <div className="card-body">
                {song.title}
            </div>
            <div className="card-footer">
                {song.artist}
            </div>
        </div>
    )
}

export default SongItem;
