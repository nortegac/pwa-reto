import React from "react";

export function Character(props) {
  return (
    <div class="card">
      <div class="row g-0">
        <div class="col-md-3">
          <img src={`${props.thumbnail.path}/landscape_xlarge.${props.thumbnail.extension}`} alt={props.name} />
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <p class="card-text">
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
