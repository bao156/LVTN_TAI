import db from '../models'
const { Op, where } = require("sequelize");
import { v4 as generateId } from 'uuid'
import generateCode from '../ultis/generateCode'
import moment from 'moment'
import generateDate from '../ultis/generateDate';
import Post from '../models/post';
export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                {
                    model: db.Overview,
                    as: 'overviews',
                    attributes: ['code', 'area', 'type', 'target', 'bonus', 'created', 'expired']
                }

            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})
export const getPostsLimitService = (page, { limitPost, order, ...query }, { priceNumber, areaNumber }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
        const limit = +limitPost || +process.env.LIMIT
        queries.limit = limit
        if (priceNumber) query.priceNumber = { [Op.between]: priceNumber }
        if (areaNumber) query.areaNumber = { [Op.between]: areaNumber }
        if (order) queries.order = [order]
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                { model: db.Overview, as: 'overviews' },
                { model: db.Label, as: 'labelData', attributes: { exclude: ['createdAt', 'updatedAt'] } },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            ],
            attributes: ['id', 'title', 'star', 'createdAt']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})
export const createNewPostService = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        const attributesId = generateId()
        const imagesId = generateId()
        const overviewId = generateId()
        const labelCode = generateCode(body.label)
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`
        const currentDate = generateDate()
        await db.Post.create({
            id: generateId(),
            title: body.title || null,
            labelCode,
            address: body.address || null,
            attributesId,
            categoryCode: body.categoryCode,
            description: JSON.stringify(body.description) || null,
            userId,
            overviewId,
            imagesId,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) : generateCode(body?.province?.replace('Tỉnh', '')) || null,
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber,
        })

        await db.Attribute.create({
            id: attributesId,
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} Đồng/tháng` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber}m2`,
            published: moment(new Date).format('DD/MM/YYYY'),
            hashtag
        })
        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body.images)
        })
        await db.Overview.create({
            id: overviewId,
            code: hashtag,
            area: body.label,
            type: body?.category,
            target: body.target,
            bonus: 'Tin thường',
            created: currentDate.today,
            expired: currentDate.expireDay,
        })
        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace('Thành phố', '') },
                    { value: body?.province?.replace('Tỉnh', '') },
                ]
            },
            default: {
                code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) : generateCode(body?.province?.replace('Tỉnh', '')),
                value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố', '') : body?.province?.replace('Tỉnh', '')
            }
        })
        await db.Label.findOrCreate({
            where: {
                code: labelCode
            },
            default: {
                code: labelCode,
                value: body.label
            }
        })
        resolve({
            err: 0,
            msg: 'OK',
        })

    } catch (error) {
        reject(error)
    }
})

export const getPostsLimitAdminService = (page, id, query) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query, userId: id }
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            order: [['createdAt', 'DESC']],
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                { model: db.Overview, as: 'overviews' },
            ],
            // attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const updatePost = ({ postId, overviewId, imagesId, attributesId, ...body }) => new Promise(async (resolve, reject) => {
    try {
        const labelCode = generateCode(body.label)
        await db.Post.update({
            title: body.title || null,
            labelCode,
            address: body.address || null,
            categoryCode: body.categoryCode,
            description: JSON.stringify(body.description) || null,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) : generateCode(body?.province?.replace('Tỉnh', '')) || null,
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber,
        }, {
            where: { id: postId }
        })

        await db.Attribute.update({
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} Đồng/tháng` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber}m2`,
        }, {
            where: { id: attributesId }
        })

        await db.Image.update({
            image: JSON.stringify(body.images)
        }, {
            where: { id: imagesId }
        })

        await db.Overview.update({
            area: body.label,
            type: body?.category,
            target: body.target,
        }, {
            where: { id: overviewId }
        })

        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace('Thành phố', '') },
                    { value: body?.province?.replace('Tỉnh', '') },
                ]
            },
            default: {
                code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) : generateCode(body?.province?.replace('Tỉnh', '')),
                value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố', '') : body?.province?.replace('Tỉnh', '')
            }
        })
        await db.Label.findOrCreate({
            where: {
                code: labelCode
            },
            default: {
                code: labelCode,
                value: body.label
            }
        })
        resolve({
            err: 0,
            msg: 'updated',
        })

    } catch (error) {
        reject(error)
    }
})

export const updatePostAdmin = (payload, postId) => new Promise(async (resolve, reject) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Separate the data for posts, overviews, and images
        const {
            title,
            star,
            labelCode,
            address,
            attributesId,
            categoryCode,
            priceCode,
            areaCode,
            provinceCode,
            description,
            dictrictCode,
            userId,
            overviewId,
            imagesId,
            priceNumber,
            areaNumber,
            // Overview attributes
            code,
            area,
            type,
            target,
            bonus,
            created,
            expired,
            // Image attributes
            image,
            // Other attributes can be added here
        } = payload;

        const postPayload = {
            title,
            star,
            labelCode,
            address,
            attributesId,
            categoryCode,
            priceCode,
            areaCode,
            provinceCode,
            description,
            dictrictCode,
            userId,
            overviewId,
            imagesId,
            priceNumber,
            areaNumber,
        };

        const overviewPayload = {
            code,
            area,
            type,
            target,
            bonus,
            created,
            expired,
        };

        const imagePayload = {
            image,
        };

        // Update the post
        const postResponse = await db.Post.update(postPayload, {
            where: { id: postId },
            transaction,
        });

        // Check if the post was updated
        if (postResponse[0] === 0) {
            await transaction.rollback();
            resolve({
                err: 1,
                msg: 'Failed to update Post.',
                response: null,
            });
            return;
        }

        // Update the overview if provided
        if (overviewId) {
            const overviewResponse = await db.Overview.update(overviewPayload, {
                where: { id: overviewId },
                transaction,
            });

            // Check if the overview was updated
            if (overviewResponse[0] === 0) {
                await transaction.rollback();
                resolve({
                    err: 1,
                    msg: 'Failed to update Overview.',
                    response: null,
                });
                return;
            }
        }

        // Update the image if provided
        if (imagesId) {
            const imageResponse = await db.Image.update(imagePayload, {
                where: { id: imagesId },
                transaction,
            });

            // Check if the image was updated
            if (imageResponse[0] === 0) {
                await transaction.rollback();
                resolve({
                    err: 1,
                    msg: 'Failed to update Image.',
                    response: null,
                });
                return;
            }
        }

        // Commit the transaction
        await transaction.commit();
        resolve({
            err: 0,
            msg: 'Updated successfully',
            response: payload,
        });
    } catch (error) {
        await transaction.rollback();
        reject({
            err: -1,
            msg: 'Failed to update post, overview, and image: ' + error.message,
        });
    }
});


export const deletePost = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.destroy({
            where: { id },
        })
        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'Deleted' : 'Deleting posts is failed.',
        })

    } catch (error) {
        reject(error)
    }
})

export const updatePostLike = async (postId, isLiked) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      post.isLiked = isLiked;
      await post.save();
      return { success: true, message: 'Post like status updated successfully' };
    } catch (error) {
      throw new Error('Failed to update post like status: ' + error.message);
    }
  };