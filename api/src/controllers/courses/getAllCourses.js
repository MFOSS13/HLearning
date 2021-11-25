const Course = require("../../models/Course");
const Category = require("../../models/Category");
const Review = require("../../models/Review");
const User = require("../../models/User");

const calculeScore = (arrayScores) => {
  let sumScore = 0;

  if(arrayScores.length === 0) return 0
  
  arrayScores.map((r) => {
    sumScore = sumScore + parseInt(r.score);
  });

  const totalScore = sumScore / arrayScores.length;

  return totalScore;
};

module.exports = async (req, res, next) => {
  
  
  try {
    let courses;
   
      courses = await Course.find({ status: "Confirmed" });
      if (courses) {       

        courses = await Category.populate(courses, { path: "categories" });
        courses = await Review.populate(courses, { path: "score" });
        courses = await User.populate(courses, { path: "students" });

        
      } else {
        res.json({ msg: "There're any course available" });
      }
    

    let { name, score, price, priceToFilter, categories, scoreToFilter } =
      req.query;

    // ----------------ORDENAMIENTO ALFABETICO---------------------------------
    if (name) {
      if (name === "A-Z" || !name || name === "") {
        coursesOrder = courses.sort((a, b) => {
          if (a.title > b.title) return 1;
          if (b.title > a.title) return -1;
          return 0;
        });
        return res.send(coursesOrder);
      }
      if (name === "Z-A" || !name || name === "") {
        coursesOrder = courses.sort((a, b) => {
          if (a.title > b.title) return -1;
          if (b.title > a.title) return 1;
          return 0;
        });
        return res.send(coursesOrder);
      }
    }

    // ----------------ORDENAMIENTO POR ESTRELLAS---------------------------------

    if (score) {
      if (score === "Desc" || !score || score === "") {
        orderScore = courses.sort((a, b) => {
          if (calculeScore(a.score) < calculeScore(b.score)) return -1;
          if (calculeScore(a.score) > calculeScore(b.score)) return 1;
          return 0;
        });
        return res.send(orderScore);
      }
      if (score === "Asc" || !score || score === "") {
        orderScore = courses.sort((a, b) => {
          if (calculeScore(a.score) < calculeScore(b.score)) return 1;
          if (calculeScore(a.score) > calculeScore(b.score)) return -1;
          return 0;
        });
        return res.send(orderScore);
      }
    }

    // -----------------------ORDENAMIENTO POR PRECIO-------------------------------------
    if (price) {
      if (price === "Asc" || !price || price === "") {
        orderPrice = courses.sort((a, b) => {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;
          return 0;
        });
        return res.send(orderPrice);
      }
      if (price === "Desc" || !price || price === "") {
        orderPrice = courses.sort((a, b) => {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;
          return 0;
        });
        return res.send(orderPrice);
      }
    }

    // ----------------------FILTRADO POR PRECIOS--------------------------------------
    if (priceToFilter) {
      priceToFilter = parseInt(priceToFilter);
      if (priceToFilter < 1000) {
        const priceToFilterLess = await Course.find({ price: { $lt: 1000 } })
          .populate("categories")
          .populate("score")
          .populate("students");
        return res.send(priceToFilterLess);
      }
      if (priceToFilter >= 1000 && priceToFilter < 1500) {
        const priceToFilterBetween = await Course.find({
          price: { $gte: 1000, $lt: 1500 },
        })
          .populate("categories")
          .populate("score")
          .populate("students");
        return res.send(priceToFilterBetween);
      }
      if (priceToFilter >= 1500 && priceToFilter < 2000) {
        const priceToFilterBetween2 = await Course.find({
          price: { $gte: 1500, $lt: 2000 },
        })
          .populate("categories")
          .populate("score")
          .populate("students");
        return res.send(priceToFilterBetween2);
      }
      if (priceToFilter >= 2000 && priceToFilter < 2500) {
        const priceToFilterBetween3 = await Course.find({
          price: { $gte: 2000, $lt: 2500 },
        })
          .populate("categories")
          .populate("score")
          .populate("students");
        return res.send(priceToFilterBetween3);
      }
      if (priceToFilter >= 2500) {
        const priceToFilterGrater = await Course.find({
          price: { $gte: 2500 },
        })
          .populate("categories")
          .populate("score")
          .populate("students");
        return res.send(priceToFilterGrater);
      }
    }

    // ------------------------FILTRADO POR CATEGORIAS-------------------------------------------

    if (categories) {
      const videoFiltercategory = await Course.find({
        categories: { $all: [`${categories}`] },
      })
        .populate("categories")
        .populate("score")
        .populate("students");

      return res.send(videoFiltercategory);
    }

    // ------------------------FILTRADO POR 5 ESTRELLAS-----------------------------------------------

    if (scoreToFilter) {
      scoreToFilter = parseInt(scoreToFilter);

      if (scoreToFilter === 5) {
        const courses5stars = [];
        courses.map((c) => {
          const scoreTotal = calculeScore(c.score);
          if (scoreTotal === 5) {
            courses5stars.push(c);
          }
        });
        return res.send(courses5stars);
      }
    }

    res.json(courses);
  } catch (err) {
    next(err);
  }
};
