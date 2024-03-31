export const getQuestionIdBySlug = async (req, res, next) => {
  const { slug } = req.params;
  const myHeaders = new Headers();
  myHeaders.append("authority", "mczhaufnomokpfoqhtno.supabase.co");
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-US,en;q=0.9,en-IN;q=0.8");
  myHeaders.append(
    "apikey",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jemhhdWZub21va3Bmb3FodG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM1MDk1OTAsImV4cCI6MTk4OTA4NTU5MH0.L3_0VvDbwVIeUJop9PBV6u6ZAmzqQxWSIoP4xL68BZ8"
  );
  myHeaders.append(
    "authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jemhhdWZub21va3Bmb3FodG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM1MDk1OTAsImV4cCI6MTk4OTA4NTU5MH0.L3_0VvDbwVIeUJop9PBV6u6ZAmzqQxWSIoP4xL68BZ8"
  );
  myHeaders.append("content-profile", "public");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("origin", "https://scuffedcode.chowkabhara.com");
  myHeaders.append("referer", "https://scuffedcode.chowkabhara.com/");
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"Windows"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "cross-site");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0"
  );
  myHeaders.append("x-client-info", "supabase-js/2.4.0");

  const raw = JSON.stringify({
    term: slug,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://mczhaufnomokpfoqhtno.supabase.co/rest/v1/rpc/queried_questions_list",
    requestOptions
  )
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Extract the necessary fields and construct a new object
      const extractedData = data.map((item) => ({
        difficulty: item.difficulty,
        title: item.title,
        QID: item.QID,
        topicTags: item.topicTags,
      }));

      // Send the extracted data as the response
      res.json(extractedData);
    })
    .catch((error) => console.error(error));
};
