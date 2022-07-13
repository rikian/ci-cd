const { createServer } = require("http");
const { readFile } = require("fs");
const server = createServer();
server.listen(8080, "0.0.0.0");

server.on("listening", () => console.log("server listening on port 8080"));

server.on("request", function (request, response) {
  if (request.url.match("favicon")) return response.end("oke");
  if (request.url.match("/profile.svg")) {
    return readFile("./profile.svg", (err, file) => {
      //jika error
      if (err) {
        response.writeHead(404);
        return response.end();
      }
      // sesuaikan type extensi nya. Di sini menggunakan svg
      // untuk jpg = 'image/jpg' atau png 'image/png'
      response.writeHead(200, {
        "content-type": "image/svg+xml",
        "content-length": file.length,
      });

      //kemudian return file nya
      return response.end(file);
    });
  }
  //isi sesuai data yang diinginkan
  const profile = htmlTemplate(
    "lawnsoor.com",
    "Rikian Faisal",
    "Web Developer",
    "profile.svg"
  );

  //di sini tambahkan http headers. Apa itu http headers? Akan dibahas nanti
  response.writeHead(200, {
    "content-type": "text/html",
    "content-length": profile.length,
  });

  response.end(profile);
});

server.on("error", (error) => console.log(error));

function htmlTemplate(nameWeb, nama, bidang, image) {
  const template = `
      <html>
        <head>
            <title>${nameWeb}</title>
            <style>
            p { margin: 4px;}
            hr {width: 50%;}
            </style>
        </head>
        <body>
          <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
          <img style="border-radius: 50%; width: 200px; height: 200px" src=${image} alt="profile"/>
          <hr />
          <div style="margin-top: 5px">${nama}</div>
          <div style="margin-top: 10px">${bidang}</div>
          <hr style="width: 80%" />
          <div style="width: 80%">
            <p><b> Lorem ipsum dolor </b> sit amet consectetur adipisicing elit.
            Recusandae, illum cumque placeat, quam sequi totam fugit
            necessitatibus reiciendis animi nihil eaque porro earum nobis iste
            eius tempora repellat hic.
            </p>
            <p>
            <b> Itaque numquam architecto </b> quae hic, temporibus in omnis
            soluta, expedita rerum ad, quos perferendis voluptates repudiandae
            delectus quam sit quo illo tempora ipsa.
            </p>
            <p>
            <b>Ipsum quasi fugit</b>recusandae voluptatem natus eos aliquam
            numquam voluptate asperiores similique sed libero neque blanditiis
            quisquam architecto.,
            </p>
          </div>
          <hr />
          @copyrigth ${nameWeb}
          </div>
        </body>
      </html>
    `;

  return template;
}

module.exports = { server };
