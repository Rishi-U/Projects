
let channelHTML = "";

channels.forEach((channel) => {
    channelHTML += `
    <div class="video-preview">
        <div class="thumbnail-row">
            <a href=""><img class="thumbnail" src="${channel.videoPreview.thumbnail}"></a>
            <div class="video-time">
                ${channel.videoPreview.videoTime}
            </div>
        </div>
        <div class="video-info-grid">
            <div class="channel-picture">
                <a href=""><img class="profile-picture" src="${channel.channelPicture}"></a>
            </div>
            <div class="video-info">
                <p class="video-title">
                    ${channel.videoInfo.videoTitle}
                </p>
                <p class="video-author">
                    <a href="">${channel.videoInfo.videoAuthor}</a>
                </p>
                <p class="video-stats">
                    ${channel.videoInfo.videoStats}
                </p>
            </div>
        </div>
    </div>`
});

document.querySelector(".js-video-grid").innerHTML = channelHTML;
