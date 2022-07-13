// routerConfig/routes.js



const routes = [
  {
    element: <div>parent</div>,
    path: "/parent",
    children: [
      {
        path: "child1",
        element: <div>child1</div>,
      },
      {
        path: "child2",
        element: <div>child2</div>,
      },
    ],
  },
];
