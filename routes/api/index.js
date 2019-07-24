import { Router } from 'express';

// IMPORT TEST CONTROLLER
import testController from '../../controllers';

const router = Router({ strict: true });

//  @ROUTE    >    GET   /api/test
//  @DESC     >    TESTING ROUTE
//  @ACCESS   >    PUBLIC
router.get('/', testController);

export default router;
