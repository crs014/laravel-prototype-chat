<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @var int
     */
    protected $statusCode = Response::HTTP_OK;

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param: $message
     * @return: json response
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
    }

    /**
     * @param : mix $data
     * @return: json response
     */
    private function _respond($data)
    {
        return response()->json($data, $this->getStatusCode());
    }

    /**
     * @param : string $message, mix $data
     * @return: json response
     */
    public function respond($data=null)
    {
        return $this->_respond([
            'status_code' => $this->getStatusCode(),
            'data' => $data
        ]);
    }
}
