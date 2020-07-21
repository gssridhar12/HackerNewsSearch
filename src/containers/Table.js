import React from "react";

const Table = ({ data, source }) => {
  console.log(source);
  return (
    <>
      {data.length
        ? data.map((item) => {
            if (typeof item === "string") {
              return <div key={item}>{item}</div>;
            }
            const { url, author, title, story_url, story_title, id, count = 0 } = item;
            const displayTitle = title ? title : story_title;
            const displayUrl = title ? url : story_url;
            return (
              <div key={id}>
                <span>
                  <a href={displayUrl} target="_blank" rel="noopener noreferrer">
                    {displayTitle}
                  </a>
                </span>

                <span style={{ float: "right" }}>
                  <b>By:</b> {author} <b>Count:</b> {count}
                </span>
              </div>
            );
          })
        : "No results"}
    </>
  );
};

export default Table;
