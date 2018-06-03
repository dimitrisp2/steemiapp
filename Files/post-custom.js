function changeBrTag(html) {
    return html.replace(/(\r\n\|\r|\n)/gi, "\<br\/\>");
}

function changeYouTubeTag(html) {
	var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    return html.replace(regExp, '\<p\>\<iframe width="50%" src="https:\/\/www.youtube.com\/embed\/$1"\>\<\/iframe\>\<\/p\>');
}

function imageSetting(html) {
    var html_change = html;
    var regex = /(<([^>]+)>)/ig
    var result = html_change.replace(regex, "");
    regex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/ig;
    var arrMatch = result.match(regex);
    if (arrMatch != null) {
        console.log(arrMatch);
        for (var i = 0; i < arrMatch.length; i++) {
            re = new RegExp(arrMatch[i], "g");
            html_change = html_change.replace(re, "<img src='" + arrMatch[i] + "'/>");
            if (i != arrMatch.lenght - 1) {
                for (var j = i + 1; j < arrMatch.length; j++) {
                    if (arrMatch[j] == arrMatch[i]) {
                        arrMatch.splice(j, 1);
                    }
                }
            }
        }
    }
    return html_change;
}

createYoutubeEmbed = (key) => {
  return '<br><iframe width="420" height="345" src="https://www.youtube.com/embed/' + key + '" frameborder="0" allowfullscreen></iframe><br/>';
};

transformYoutubeLinks = (text) => {
  if (!text) return text;
  const self = this;

  const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
  const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

  let resultHtml = text;  

  // get all the matches for youtube links using the first regex
  const match = text.match(fullreg);
  if (match && match.length > 0) {
    // get all links and put in placeholders
    const matchlinks = text.match(linkreg);
    if (matchlinks && matchlinks.length > 0) {
      for (var i=0; i < matchlinks.length; i++) {
        resultHtml = resultHtml.replace(matchlinks[i], "#placeholder" + i + "#");
      }
    }

    // now go through the matches one by one
    for (var i=0; i < match.length; i++) {
      // get the key out of the match using the second regex
      let matchParts = match[i].split(regex);
      // replace the full match with the embedded youtube code
      resultHtml = resultHtml.replace(match[i], self.createYoutubeEmbed(matchParts[1]));
    }

    // ok now put our links back where the placeholders were.
    if (matchlinks && matchlinks.length > 0) {
      for (var i=0; i < matchlinks.length; i++) {
        resultHtml = resultHtml.replace("#placeholder" + i + "#", matchlinks[i]);
      }
    }
  }
  return resultHtml;
};
