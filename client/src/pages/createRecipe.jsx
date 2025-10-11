import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Form, Input, Button, Tag, message } from "antd";

import Navbar from "../components/Navbar.jsx";
import UploadWidget from "../components/UploadWidget.jsx";
import Spinner from "../components/Spinner.jsx";
import createRecipeImg from "../../public/assets/createRecipe.png";
import "../styles/createRecipe.css";
import API_BASE_URL from "../constant.js";

const CreateRecipe = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?.data?.data?.user?._id;

  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const handleIngredientChange = (value, index) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleImageUpload = (imageUrl) => {
    console.log(imageUrl)
    form.setFieldsValue({ recipeImg: imageUrl });
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const payload = {
        ...values,
        ingredients,
        userOwner: userId,
      };

      const resp = await axios.post(
        `${API_BASE_URL}/api/v1/recipe/create`,
        payload,
        {
          headers: { authorization: cookies.access_token },
        }
      );

      message.success("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Failed to create recipe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="createRecipeContainer container">
        <p className="sectionHeading">Create Recipe</p>
        <div className="createRecipe">
          <img src={createRecipeImg} alt="Create Recipe" />
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="createRecipeForm"
          >
            <Form.Item
              label="Recipe Name"
              name="name"
              rules={[{ required: true, message: "Please input the recipe name!" }]}
            >
              <Input placeholder="Enter recipe name" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <Input.TextArea placeholder="Enter recipe description" rows={3} />
            </Form.Item>

            <Form.List name="ingredients">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }, index) => (
        <Form.Item
          {...restField}
          label={index === 0 ? "Ingredients" : ""}
          required
          key={key}
          style={{ marginBottom: 8 }}
        >
          <Input
            placeholder={`Ingredient ${index + 1}`}
            style={{ width: "80%", marginRight: 8 }}
          />
          <Button danger type="text" onClick={() => remove(name)}>
            Remove
          </Button>
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={() => add()} block>
          Add Ingredient
        </Button>
      </Form.Item>
    </>
  )}
</Form.List>


            <Form.Item
              label="Instructions"
              name="instructions"
              rules={[{ required: true, message: "Please enter instructions!" }]}
            >
              <Input.TextArea placeholder="Cooking steps..." rows={4} />
            </Form.Item>

            <Form.Item
              label="Recipe Image"
              name="recipeImg"
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Input disabled placeholder="Image URL will appear here" />
                <UploadWidget onImageUpload={handleImageUpload} />
              </div>
            </Form.Item>

            <Form.Item
              label="Cooking Time (minutes)"
              name="cookingTime"
              rules={[{ required: true, message: "Please enter cooking time!" }]}
            >
              <Input type="number" placeholder="Cooking time in minutes" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Create Recipe"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;
