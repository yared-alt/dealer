"use client"
import React, { useState } from "react";
import {
  Check, Plus, Image as ImageIcon,
  FileImage, Save, Star,
  CloudHail,
} from "lucide-react";
import { Car } from "@/type/Car";
import getsingelCar from "@/lib/utils/shared-api/getsingleCar";
import { serializeCar } from "@/helper/serializeData";

const DEFAULT_IMG = "/bff0fbea-2ff6-492f-94a5-7074eaa101b7.png";
const CAR_CATEGORIES = ["SUV", "Sedan", "Hatchback", "Truck", "Convertible"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
const COLORS = [
  "Black", "White", "Gray", "Blue", "Red",
  "Silver", "Green", "Yellow", "Purple", "Orange"
];
const SIZES = ["4 people", "6 people", "2 pleople", "12 people", "72 people", "15 people"];
const CONDITIONS = ["New", "Used", "Refurbished"];
const TRANSMISSIONS = ["Manual", "Automatic", "Semi-automatic"];
const YEARS = Array.from({ length: 35 }, (_, i) => `${1990 + i}`);
const SUBCATEGORIES = ["Premium", "Standard", "Budget", "Family", "Sport"];


async function fetche(id: string) {
  const { singlecar } = await getsingelCar(id)
  if (singlecar) {
    return singlecar;
  }
  return false;
}

const page = async (id: string) => {
  const data: Car | boolean = await fetche(id)
  if (!data) {
    alert("car is not found")
    return;
  }
  const serializedData = serializeCar(data);
  // console.log("dddddddddddd",serializedData)

  console.log(serializedData.SupportImages)
  const [carName, setCarName] = useState(serializedData.CarName);
  const [carBrand, setCarBrand] = useState(serializedData.CarBrand);
  const [model, setModel] = useState(serializedData.Model);
  const [mileGone, setMileGone] = useState(serializedData.MileGone);
  const [category, setCategory] = useState(serializedData.Catagory);
  const [subCategory, setSubCategory] = useState(serializedData.SubCategory);
  const [discountedAmount, setDiscountedAmount] = useState(serializedData.DiscountedAmount);
  const [warrantyGiven, setWarrantyGiven] = useState(serializedData.WarrantyGiven);
  const [description, setDescription] = useState(serializedData.Description);
  const [price, setPrice] = useState(serializedData.Price);
  const [fuelType, setFuelType] = useState(serializedData.FuelType);
  const [color, setColor] = useState(serializedData.Color);
  const [size, setSize] = useState(serializedData.Size);
  const [condition, setCondition] = useState(serializedData.Condition);
  const [transmission, setTransmission] = useState(serializedData.Transmission);
  const [silinder, setSilinder] = useState(serializedData.Silinder);
  const [year, setYear] = useState(serializedData.Year);
  const [isNew, setIsNew] = useState(serializedData.IsNew);
  const [review, setReview] = useState(serializedData.Review);
  const [isPopular, setIsPopular] = useState(serializedData.IsPopular);
  const [inStock, setInStock] = useState(serializedData.InStock);

  const [frontImagee, setFrontImage] = useState(serializedData.FrontImage);
  const [frontImageFile, setFrontImageFile] = useState<File | null>(null);
  const [supportImages, setSupportImages] = useState([
    serializedData.SupportImages
  ]);
  const [supportImageFiles, setSupportImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);

  supportImages.forEach(item => {
    if (typeof item === 'string') {
      return item.replace("car-folderA", 'car-folder/');
    }
  })

  const editpro = async () => {
    try {
      const searchparams = new URLSearchParams(window.location.search)
      const id = searchparams.get("id") || ""
      const params = new URLSearchParams({ id });

      const url = `/api/Car/edit?${params}`
      const res = await fetch(url, { method: "POST" });

      console.log(res)
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const { data } = await res.json();

    } catch (err) {
      console.log(err)
    }

  }


  const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFrontImage(URL.createObjectURL(file));
    setFrontImageFile(file);
    console.log("frontImagee", frontImagee)
    console.log("frontImageeFile", frontImageFile)
  };

  const handleSupportImageChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newImages = [...supportImages];
    newImages[idx] = URL.createObjectURL(file);
    setSupportImages(newImages);

    const newFiles = [...supportImageFiles];
    newFiles[idx] = file;
    setSupportImageFiles(newFiles);
    console.log("support", supportImages)
    console.log("supportFile", supportImageFiles)
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget as HTMLFormElement);

    // console.log("fileq1,", frontImageFile)
    // console.log("no", supportImageFiles)

    const finalFormData = new FormData()


    const brandname = formdata.get("carBrand")
    const carname = formdata.get("carName")
    const catagory = formdata.get("catagory")
    const price = formdata.get("price")
    const description = formdata.get("")
    const color = formdata.get("color")
    const size = formdata.get("size")
    const model = formdata.get("model")
    const discount = formdata.get("discountedAmount")
    const subcatagory = formdata.get("subCategory")
    const warranty = formdata.get("warrantyGiven")
    const fuel = formdata.get("fuelType")
    const milegone = formdata.get("mileGone")
    const condition = formdata.get("condition")
    const transmission = formdata.get("transmission")
    const silinder = formdata.get("silinder")
    const year = formdata.get("year")
    const isnew = formdata.get("isNew")
    const isPopular = formdata.get("isPopular")
    const Instock = formdata.get("inStock")

    finalFormData.append("frontImage", frontImageFile as File)
    supportImageFiles.forEach((file, i) => {
      if (file) {
        finalFormData.append("otherImages", file)
      }
    })
    finalFormData.append("brandname", brandname as string)
    finalFormData.append("carname", carname as string)
    finalFormData.append("catagory", catagory as string)
    finalFormData.append("price", price as string)
    finalFormData.append("description", description as string)
    finalFormData.append("color", color as string)
    finalFormData.append("size", size as string)
    finalFormData.append("model", model as string)
    finalFormData.append("discount", discount as string)
    finalFormData.append("subcatagory", subcatagory as string)
    finalFormData.append("warranty", warranty as string)
    finalFormData.append("fuel", fuel as string)
    finalFormData.append("milegone", milegone as string)
    finalFormData.append("condition", condition as string)
    finalFormData.append("transmission", transmission as string)
    finalFormData.append("silinder", silinder as string)
    finalFormData.append("year", year as string)
    finalFormData.append("isnew", isnew as string)
    finalFormData.append("isPopular", isPopular as string)
    finalFormData.append("Instock", Instock as string)

    try {
      const response = await fetch("/api/edit", { method: "POST", body: finalFormData })
      console.log(response)
    } catch (error) {
      console.error(error);
    }
    window.alert("Product uploaded (demo only).");
  };

  return (
    <form
      className="min-h-screen py-36 bg-gray-50 p-4"
      autoComplete="off"
      onSubmit={handleFormSubmit}
      noValidate
    >
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <FileImage className="h-7 w-7 text-sky-700" />
            <h1 className="text-2xl font-bold text-gray-900">Upload Car Product</h1>
          </div>
          <div className="flex gap-3 mt-3 md:mt-0">
            <button
              type="submit"
              onClick={editpro}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              <Check className="h-4 w-4" />
              Edit Product
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm space-y-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="carname">
                    Car Name
                  </label>
                  <input
                    id="carname"
                    name="carName"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={carName}
                    onChange={e => setCarName(e.target.value)}
                    placeholder="Car Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="carbrand">
                    Car Brand
                  </label>
                  <input
                    id="carbrand"
                    name="carBrand"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={carBrand}
                    onChange={e => setCarBrand(e.target.value)}
                    placeholder="Toyota, BMW, Ford..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="model">
                    Model
                  </label>
                  <input
                    id="model"
                    name="model"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    required
                    placeholder="Model"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="year">
                    Year
                  </label>
                  <select
                    id="year"
                    name="year"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={year}
                    required
                    onChange={e => setYear(Number(e.target.value))}
                  >
                    {YEARS.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    {CAR_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="subcategory">
                    Sub Category
                  </label>
                  <select
                    id="subcategory"
                    name="subCategory"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={subCategory}
                    onChange={e => setSubCategory(e.target.value)}
                  >
                    {SUBCATEGORIES.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm space-y-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Features & Specs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="fuel">
                    Fuel Type
                  </label>
                  <select
                    id="fuel"
                    name="fuelType"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={fuelType}
                    onChange={e => setFuelType(e.target.value)}
                    required
                  >
                    {FUEL_TYPES.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="color">
                    Color
                  </label>
                  <select
                    id="color"
                    name="color"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={color}
                    required
                    onChange={e => setColor(e.target.value)}
                  >
                    {COLORS.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="size">
                    Size
                  </label>
                  <select
                    id="size"
                    name="size"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={size}
                    required
                    onChange={e => setSize(e.target.value)}
                  >
                    {SIZES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="transmission">
                    Transmission
                  </label>
                  <select
                    id="transmission"
                    name="transmission"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={transmission}
                    required
                    onChange={e => setTransmission(e.target.value)}
                  >
                    {TRANSMISSIONS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="silinder">
                    Silinder
                  </label>
                  <input
                    id="silinder"
                    name="silinder"
                    required
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={silinder}
                    onChange={e => setSilinder(Number(e.target.value))}
                    placeholder="e.g. 4"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="condition">
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={condition}
                    required
                    onChange={e => setCondition(e.target.value)}
                  >
                    {CONDITIONS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="milegone">
                    Miles Gone
                  </label>
                  <input
                    id="milegone"
                    name="mileGone"
                    required
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    type="number"
                    value={mileGone}
                    onChange={e => setMileGone(Number(e.target.value))}
                    placeholder="e.g. 15000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="warranty">
                    Warranty Given
                  </label>
                  <input
                    id="warranty"
                    name="warrantyGiven"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={warrantyGiven}
                    required
                    onChange={e => setWarrantyGiven(e.target.value)}
                    placeholder="e.g. 2 years"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="discountedamt">
                    Discounted Amount
                  </label>
                  <input
                    id="discountedamt"
                    name="discountedAmount"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    type="number"
                    value={discountedAmount}
                    onChange={e => setDiscountedAmount(Number(e.target.value))}
                    placeholder="e.g. 3000"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm space-y-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Pricing & Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="price">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    type="number"
                    value={price}
                    required
                    onChange={e => setPrice(Number(e.target.value))}
                    placeholder="e.g. 15000"
                  />
                </div>
                <div>
                  <label className=" text-xs text-gray-500 mb-1 font-bold flex items-center gap-1" htmlFor="review">
                    <Star className="h-3 w-3" />
                    Review
                  </label>
                  <input
                    id="review"
                    name="review"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-100 text-gray-800"
                    value={review}
                    onChange={e => setReview(Number(e.target.value))}
                    placeholder="e.g. 4.5/5"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={isNew}
                      onChange={e => setIsNew(e.target.checked)}
                      className="accent-green-600 h-4 w-4"
                    />
                    Is New
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPopular"
                      checked={isPopular}
                      onChange={e => setIsPopular(e.target.checked)}
                      className="accent-blue-600 h-4 w-4"
                    />
                    Is Popular
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={inStock}
                      onChange={e => setInStock(e.target.checked)}
                      className="accent-teal-600 h-4 w-4"
                    />
                    In Stock
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4 items-center">
              <div className="w-full flex justify-between items-center mb-2">
                <h2 className="text-base font-semibold text-gray-800">Front Image</h2>
                <label
                  htmlFor="front-image-upload"
                  className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 text-xs font-medium"
                >
                  <ImageIcon className="h-4 w-4" />
                  Upload
                  <input
                    id="front-image-upload"
                    name="frontImage"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={handleFrontImageChange}
                    required
                  />
                </label>
              </div>
              <div className="rounded-lg bg-gray-100 overflow-hidden w-full h-44 flex items-center justify-center border border-gray-200">
                {
                  typeof frontImagee == "string" ? (
                    <>
                      <img
                        src={`https://res.cloudinary.com/dr1ejpdn8/image/upload/${frontImagee.replace("car-folderA", "car-folder/")}`}
                        className="object-contain w-full h-full"
                        alt="Front"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={frontImagee}
                        className="object-contain w-full h-full"
                        alt="Front"
                      />
                    </>
                  )
                }
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-y-4">
              <h2 className="text-base font-semibold text-gray-800">Support Images</h2>
              <div className="grid grid-cols-3 gap-3">
                {supportImages.map((img, idx) => (
                  <div key={idx} className="flex flex-col items-center">

                    <label
                      htmlFor={`support-image-upload-${idx}`}
                      className="cursor-pointer w-full h-20 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center overflow-hidden hover:bg-gray-200"
                    >
                      {typeof img === "string" ? (
                        <img
                          src={`https://res.cloudinary.com/dr1ejpdn8/image/upload/${img.replace("car-folderA", "car-folder/")}`}
                          alt={`Support ${idx + 1}`}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <img
                          src={img}
                          alt={`Support ${idx + 1}`}
                          className="object-contain w-full h-full"
                        />
                      )}
                      <input
                        id={`support-image-upload-${idx}`}
                        name={`supportImage${idx}`}
                        type="file"
                        className="hidden"
                        accept="image/png,image/jpeg"
                        onChange={e => handleSupportImageChange(idx, e)}
                      />
                    </label>
                    <span className="text-xs text-gray-600 mt-1">Image {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8">
              <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4">
                <label className="block text-xs text-gray-500 mb-1 font-bold" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 min-h-[100px] bg-gray-100 text-gray-800"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the car..."
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form >
  );
};

export default page;